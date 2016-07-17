(function () {
    'use strict';

    angular.module('pagarMe').config([
        '$httpProvider',
        PagarMeHttpConfig
    ]);

    /**
     * @ngdoc overview
     * @name pagarMe.config:PagarMeHttpConfig
     * 
     * @requires $httpProvider
     * 
     * @description
     * Configure $http to add a interceptor for set api key for all requests.
     */
    function PagarMeHttpConfig($httpProvider) {

        $httpProvider.interceptors.push('PagarMeHttpInterceptor');
        
    }
})();