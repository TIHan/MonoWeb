﻿define(function (require) {
    var app = require('durandal/app');
    var router = require('durandal/plugins/router');

    function vm() {
        /*************************************************************************/
        /* Private
        /*************************************************************************/

        var self = this;

        /*************************************************************************/
        /* Conventional
        /*************************************************************************/

        self.activate = function() {
            router.mapRoute('home', 'viewmodels/home', "Home", true);
            router.activate('home');
        };

        self.router = router;

        /*************************************************************************/
        /* Non-Conventional
        /*************************************************************************/
        
        /*************************************************************************/
        /* Events
        /*************************************************************************/
    }

    return new vm();
});