﻿define(function (require) {
	var http = require("http");

    function vm() {
        /*************************************************************************/
        /* Private
        /*************************************************************************/
        
        var self = this;

        /*************************************************************************/
        /* Conventional
        /*************************************************************************/

        self.activate = function () {
			return true;
        };

        self.canActivate = function () {
            return true;
        };

        /*************************************************************************/
        /* Non-Conventional
        /*************************************************************************/

        /*************************************************************************/
        /* Events
        /*************************************************************************/
    }

    return new vm();
});