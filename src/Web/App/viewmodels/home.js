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
        	
        	var testMessageGet = api.get('/test/message/' + 'Custom').done(function (response) {
        		self.testMessageGetResponse(ko.object.toObservable(response));
        	});
        	
        	var testQueryGet = api.get('/testquery', { field1: 'Test1', field2: 'Test2', field3: 'Test3' }).done(function (response) {
				self.testQueryGetResponse(ko.object.toObservable(response));
			});
			
			var testListGet = api.get('/testlist').done(function (response) {
				self.testListGetResponse(ko.object.toObservable(response));
			});
			
			var testPost = api.post('/test').done(function (response) {
				self.testPostResponse(ko.object.toObservable(response));
			});
			
			var testMessagePost = api.post('/test/message', { message: 'Custom' }).done(function (response) {
				self.testMessagePostResponse(ko.object.toObservable(response));
			});
			
			var testPut = api.put('/test').done(function (response) {
				self.testPutResponse(ko.object.toObservable(response));
			});
			
			var testMessagePut = api.put('/test/message', { message: 'Custom' }).done(function (response) {
				self.testMessagePutResponse(ko.object.toObservable(response));
			});
			
			var testDelete = api.del('/test').done(function (response) {
				self.testDeleteResponse(ko.object.toObservable(response));
			});
			
			var testMessageDelete = api.del('/test/message', { message: 'Custom' }).done(function (response) {
				self.testMessageDeleteResponse(ko.object.toObservable(response));
			});
			
			return $.when(testGet, testMessageGet, testQueryGet, testListGet, testPost,
					testMessagePost, testPut, testMessagePut, testDelete, testMessageDelete);
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
        self.testListGetResponse = ko.observable();
        
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