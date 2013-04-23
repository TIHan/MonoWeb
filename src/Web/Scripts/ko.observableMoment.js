(function () {
    ko.observableMoment = function (initialValue) {
        var observable = ko.observable(initialValue);

        ko.utils.extend(observable, {
            moment: ko.computed(function () {
                if (!observable()) {
                    return undefined;
                }
                return moment.utc(observable());
            }),

            add: function(input, val) {
                observable(observable.moment().add(input, val).toDate());
                return observable;
            },

            subtract: function(input, val) {
                observable(observable.moment().subtract(input, val).toDate());
                return observable;
            },

            format: function(inputString) {
                return ko.computed(function () {
                    if (!observable()) {
                        return undefined;
                    }
                    return observable.moment().format(inputString);
                });
            },

            calendar: function () {
                return observable.moment().calendar();
            },

            shortformat: ko.computed(function () {
                if (!observable()) {
                    return undefined;
                }
                if (moment(observable()) > moment().startOf('day')) {
                    return observable.moment().local().format('h:mm A');
                } else {
                    return observable.moment().local().format('M/D/YYYY');
                }
            })
        });

        return observable;
    };
})();