(function () {    
    // The object value only gets updated if it is
    // a writeable observable that is not an instance.
    function updateObject(obj, value) {
        if (ko.isWriteableObservable(obj)) {
            if (_.isInstance(obj())) {
                ko.object.map(obj, value);
            } else {
                if (obj() !== value) {
                    obj(value);
                }
            }
        } else if (_.isInstance(obj)) {
            ko.object.map(obj, value);
        }
    }
    
    function mapInstance(mapped, obj) {
        var unwrapped = ko.utils.unwrapObservable(mapped);
        _.each(obj, function (v, k) {
            var prop = unwrapped[k];
            if (prop) {
                updateObject(prop, v);
            }
        });
    }
    
    function mapArray(mapped, obj) {
        mapped.valueWillMutate();
        
        var unwrapped = ko.utils.unwrapObservable(mapped);
        for (var len = unwrapped.length - obj.length; len > 0; --len) {
            unwrapped.pop();
        }

        _.each(obj, function (v, k) {
            if (unwrapped.length >= k + 1) {
                ko.object.map(unwrapped[k], v);
            } else {
                if (mapped.ctor) {
                    unwrapped.push(ko.object.create(mapped.ctor, v));
                } else {
                    unwrapped.push(v);
                }
            }
        });
        
        // Let's just go ahead and tell subscribers that the array changed even though it may
        // not have, this approach is simple without having to add more complexity by checking other observables.
        // TODO: In the future, we could check to see if any of the items' observables have mutated
        // TODO: to determine if the array will be marked as mutated. This requires work though.
        mapped.valueHasMutated();
    }
    
    function mapExplicitProperties(mapped, obj, explicitMappings) {
        _.each(explicitMappings, function (v, k) {
            var mappedProp = findProperty(ko.utils.unwrapObservable(mapped), k);
            var objProp = findProperty(obj, v);

            if (mappedProp) {
                updateObject(mappedProp, objProp);
            }
        });
    }
    
    function toObservable(obj) {
    	var observable = _.isArray(obj) ? [] : {};
        _.each(obj, function (v, k) {
        	if (_.contains(v, '\/')) { // Hack: Usually a date here.
        		observable[k] = ko.observableMoment(v);
        	} else {
            	observable[k] = _.isInstance(v) ? toObservable(v) : ko.observable(v);
        	}
        });
        return observable;
    }
    
    ko.extenders.ctor = function (target, ctor) {
        target.ctor = ctor;
        return target;
    };
    
    _.isInstance = function (obj) {
        if (_.isObject(obj) && !_.isFunction(obj)) {
            return true;
        }
        return false;
    };
    
    ko.isObservableInstance = function (instance) {
        if (ko.isObservable(instance) && _.isInstance(instance())) {
            return true;
        }
        return false;
    };

    ko.object = {
    	toObservable: function (obj) {
    		return toObservable(obj);
    	},
        create: function (ctor, obj, explicitMappings) {
            // Only allow functions, not including observables.
            if (ko.isObservable(ctor) || !_.isFunction(ctor)) {
                return null;
            }

            var created = new ctor();
            ko.object.map(created, obj, explicitMappings);
            return created;
        },

        map: function (mapped, obj, explicitMappings) {
            // The mapped object should be an instance.
            if (!_.isInstance(mapped) && !ko.isObservableInstance(mapped))
                return;

            // The object to map should be an instance.
            if (!_.isInstance(obj))
                return;

            // Check if the mapped object and object to map are arrays.
            if (_.isArray(ko.utils.unwrapObservable(mapped)) && _.isArray(obj)) {
                mapArray(mapped, obj);
            } else {
                if (_.isInstance(explicitMappings)) {
                    mapExplicitProperties(mapped, obj, explicitMappings);
                }
                mapInstance(mapped, obj);
            }
        }
    };
})();