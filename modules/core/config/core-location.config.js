(function () {
    'use strict';

    angular.module('core').config([
        '$locationProvider',
        CoreLocationConfig
    ]);
    
    /**
     * @ngdoc overview
     * @name core.config:CoreLocationConfig
     * 
     * @requires $locationProvider
     * 
     * @description
     * Configure $location to enable html5 mode location.
     */
    function CoreLocationConfig($locationProvider) {

        $locationProvider.html5Mode(true).hashPrefix('!');
        
    }
})();