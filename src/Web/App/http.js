define(function (require) {
    var system = require('durandal/system');
    
    function ajax(url, data, type) {
        return $.ajax({
            url: url,
            data: ko.toJSON(data || { }),
            type: type,
            contentType: 'application/json',
        }).fail(function (error) {
            system.log(type + ' Error', error);
        });
    };
    
    return {
        get: function (url, query) {
            return $.ajax({
            	url: url,
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
        }
    };
});