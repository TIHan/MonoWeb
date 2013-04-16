define(function (require) {
    var system = require('durandal/system');
    
    function service() {
    	var self = this;    	
	    
	    self.start = function () {
		    return $.connection.hub.start().done(function () {
		    	system.log('SignalR successfully connected.');
		    }).fail(function () {
		    	system.log('SignalR failed to connected.');
		    });
	    }
	    
	    self.send = function (message) {
	    }
    }
    
    return new service();
});
