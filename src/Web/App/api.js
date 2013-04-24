define(function (require) {
    var system = require('durandal/system');
    var router = require('durandal/plugins/router');
    
	var info = {
		displayName: ko.observable()
	};
    var path = '';
    var unauthorizedRedirectPath = '#/login';
    
    $.ajaxSetup({
        error: function (jqXHR) {
            if (router.ready() && jqXHR.status == 401) {
                router.navigateTo(unauthorizedRedirectPath);
            }
        }
    });
    
    function ajax(url, data, type) {
        return $.ajax({
            url: path + url,
            data: ko.toJSON(data || { }),
            type: type,
            contentType: 'application/json',
        }).fail(function (error) {
            system.log(type + ' Error', error);
        });
    };
    
    var api = {
        get: function (url, query) {
            return $.ajax({
            	url: path + url + (query ? '?' + $.param(query) : ''),
            	type: "GET",
            	contentType: 'application/json',
            	cache: false
            }).fail(function (error) {
            	system.log("GET Error", error);
            });
        },
        post: function (url, data) {
            return ajax(url, data, 'POST');
        },
        put: function (url, data) {
            return ajax(url, data, 'PUT');
        },
        del: function (url, data) {
            return ajax(url, data, 'DELETE');
        },
        login: function (userName, password, rememberMe) {
        	return ajax('/auth/credentials', { userName: userName, password: password, rememberMe: rememberMe }, 'POST').done(function () {
        		ajax('/auth/info', null, 'GET').done(function (response) {
        			ko.object.map(info, response);
        		});
        	});
        },
        logout: function () {
        	info.displayName(null);
        	return ajax('/auth/logout', null, 'POST');
        },
        checkAuth: function () {
	        system.log('Checking authentication...');
	        var defer = system.defer(function () {
	            ajax('/auth/info', null, 'GET')
	                .then(function (response) {
	                    system.log('User is authenticated.');
	                    ko.object.map(info, response);
	                    defer.resolve(true);
	                }).fail(function () {
	                    system.log('User is not authenticated.');
	                    defer.resolve(false);
	                });
	        });
	        return defer.promise();
        },
      	reverseCheckAuth: function () {
	        var defer = system.defer(function () {
	            api.checkAuth().then(function(isAuthorized) {
	                if (isAuthorized) {
	                    defer.resolve(false);
	                } else {
	                    defer.resolve(true);
	                }
	            });
	        });
	        return defer.promise();
      	},
        displayName: ko.computed(function () {
        	return info.displayName();
        }),
        setPath: function (newPath) {
        	path = newPath;
        },
        setUnauthorizedRedirectPath: function (newPath) {
        	unauthorizedRedirectPath = '#' + newPath;
        }
    };
    
    return api;
});