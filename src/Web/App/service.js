define(function (require) {
    var system = require('durandal/system');
    
    var appHub = $.connection.appHub;
    
	appHub.client.logMessage = function (message) {
		system.log(message);
	}

    function service() {
    	var self = this;    	
	    
	    self.start = function () {
			$.connection.hub.url = 'http://localhost:8080/signalr';
		    return $.connection.hub.start({ jsonp: true }).done(function () {
		    	system.log('SignalR successfully connected.');
		    	appHub.server.heartbeat();
		    }).fail(function () {
		    	system.log('SignalR failed to connected.');
		    });
	    }
    }
    
    return new service();
});
