define(function (require) {
    var system = require('durandal/system');
    
    function service() {
    	var self = this;    	
	    // SignalR
	    var connection = $.connection('/echo');
	    
	    self.start = function () {
		    return connection.start().done(function () {
		    	system.log('SignalR successfully connected.');
		    }).fail(function () {
		    	system.log('SignalR failed to connected.');
		    });
	    }
	    
	    self.send = function (message) {
	    	return connection.send(message);
	    }
    }
    
    return new service();
});
