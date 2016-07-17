(function () {
    'use strict';

    angular.module('core').config([
        '$httpProvider',
        CoreHttpConfig
    ]);
    
    
    /**
     * @ngdoc overview
     * @name core.config:CoreHttpConfig
     * 
     * @requires $httpProvider
     * 
     * @description
     * Configure $http to disable explicit cookie, adjust the xDomain.
     */
    function CoreHttpConfig($httpProvider) {

        // Disable explicitly cookie
        $httpProvider.defaults.withCredentials = false;
        
        // Use xDomain IE
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        
    }
})();