(function () {
    'use strict';

    angular.module('validatorServer').config([
        '$httpProvider',
        ValidatorServerHttpConfig
    ]);

    /**
     * @ngdoc overview
     * @name validatorServer.config:ValidatorServerHttpConfig
     * 
     * @requires $httpProvider
     * 
     * @description
     * Configure $http to add a interceptor for trigger a $broadcast for bad request.
     */
    function ValidatorServerHttpConfig($httpProvider) {

        $httpProvider.interceptors.push('ValidatorServerHttpInterceptor');
        
    }
})();