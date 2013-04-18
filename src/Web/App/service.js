define(function (require) {
    var system = require('durandal/system');
    
    var appHub = $.connection.appHub;
    
	appHub.client.log = function (message) {
		system.log(message);
	}

    function service() {
    	var self = this;    	
	    
	    self.start = function () {
		    $.connection.hub.start().done(function () {
		    	system.log('SignalR successfully connected.');
		    	appHub.server.heartbeat();
		    }).fail(function () {
		    	system.log('SignalR failed to connected.');
		    });
	    }
    }
    
    return new service();
});
