define(function (require) {
    var system = require('durandal/system');
    var router = require('durandal/plugins/router');
    
	var info = {
		displayName: ko.observable()
	};
    var apiPath = '';
    var unauthorizedRedirectRoute = '#/login';
    var loginRoute = '#/login';
    
    $.ajaxSetup({
        error: function (jqXHR) {
            if (router.ready() && jqXHR.status == 401) {
                router.navigateTo(unauthorizedRedirectRoute);
            }
        }
    });
    
    function ajax(url, data, type) {
        return $.ajax({
            url: apiPath + url,
            data: ko.toJSON(data || { }),
            type: type,
            contentType: 'application/json',
        }).fail(function (error) {
            system.log(type + ' Error', error);
        });
    };

    
    var api = {
    	init: function () {
			router.guardRoute = function (routeInfo, params, instance) {
				var defer;
				if (routeInfo.hash == loginRoute) {
			        defer = system.defer(function () {
			            ajax('/auth/info', null, 'GET')
			                .then(function (response) {
			                    ko.object.map(info, response);
			                    defer.resolve('#/');
			                }).fail(function () {
			                    defer.resolve(true);
			                });
			        });
				} else {
			        defer = system.defer(function () {
			            ajax('/auth/info', null, 'GET')
			                .then(function (response) {
			                    ko.object.map(info, response);
			                    defer.resolve(true);
			                }).fail(function () {
			                    defer.resolve(loginRoute);
			                });
			        });
		        }
		        return defer.promise();
			};
    	},
        get: function (url, query) {
            return $.ajax({
            	url: apiPath + url + (query ? '?' + $.param(query) : ''),
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
        displayName: ko.computed(function () {
        	return info.displayName();
        }),
        setPath: function (path) {
        	apiPath = path;
        },
        setUnauthorizedRedirectRoute: function (route) {
        	unauthorizedRedirectRoute = route;
        },
        setLoginRoute: function (route) {
        	loginRoute = route;
        }
    };
    
    return api;
});