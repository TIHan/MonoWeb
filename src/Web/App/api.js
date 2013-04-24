define(function (require) {
    var system = require('durandal/system');
    var router = require('durandal/plugins/router');
    
	var info = {
		displayName: ko.observable()
	};
    var path = '';
    var unauthorizedRedirectPath = '#/login';
    var loginPath = '#/login';
    
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
    	init: function () {
			router.guardRoute = function (routeInfo, params, instance) {
				var defer;
				if (routeInfo.name == 'Login') {
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
			                    defer.resolve(loginPath);
			                });
			        });
		        }
		        return defer.promise();
			};
    	},
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
        displayName: ko.computed(function () {
        	return info.displayName();
        }),
        setPath: function (newPath) {
        	path = newPath;
        },
        setUnauthorizedRedirectPath: function (newPath) {
        	unauthorizedRedirectPath = newPath;
        },
        setLoginPath: function (newPath) {
        	loginPath = newPath;
        }
    };
    
    return api;
});