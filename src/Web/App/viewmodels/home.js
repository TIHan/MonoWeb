define(function (require) {
    var system = require('durandal/system');
	var api = require('api');

    function vm() {
        /*************************************************************************/
        /* Private
        /*************************************************************************/
        
        var self = this;

        /*************************************************************************/
        /* Conventional
        /*************************************************************************/

        self.activate = function () {
        	// These are test API calls. Remove them.
        	var testGet = api.get('/test').done(function (response) {
        		self.testGetResponse(ko.object.toObservable(response));
        	});
        	
        	var testMessageGet = api.get('/test/' + 'Custom').done(function (response) {
        		self.testMessageGetResponse(ko.object.toObservable(response));
        	});
        	
        	var testQueryGet = api.get('/testquery', { field1: 'Test1', field2: 'Test2' }).done(function (response) {
				self.testQueryGetResponse(ko.object.toObservable(response));
			});
			
			return $.when(testGet, testMessageGet, testQueryGet);
        };

        self.canActivate = function () {
            return true;
        };

        /*************************************************************************/
        /* Non-Conventional
        /*************************************************************************/
        
        self.testGetResponse = ko.observable();
        self.testMessageGetResponse = ko.observable();
        self.testQueryGetResponse = ko.observable();
        
        self.testPostResponse = ko.observable();
        self.testMessagePostResponse = ko.observable();
        
        self.testPutResponse = ko.observable();
        self.testMessagePutResponse = ko.observable();
        
        self.testDeleteResponse = ko.observable();
        self.testMessageDeleteResponse = ko.observable();

        /*************************************************************************/
        /* Events
        /*************************************************************************/
    }

    return new vm();
});