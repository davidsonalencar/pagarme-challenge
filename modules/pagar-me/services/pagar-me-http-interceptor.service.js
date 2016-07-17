(function () {
    'use strict';

    angular.module('pagarMe').factory('PagarMeHttpInterceptor', [
        'PAGAR_ME_CONFIG',
        PagarMeHttpInterceptorService
    ]);

    /**
     * @ngdoc service
     * @name pagarMe.service:PagarMeHttpInterceptor
     * @kind object
     *
     * @requires pagarMe.constant:PAGAR_ME_CONFIG
     * 
     * @description
     * Service used to intercept HTTP requests to add api_key as a parameter.
     */
    function PagarMeHttpInterceptorService(PAGAR_ME_CONFIG) {
        var service = {
            request: request
        };
        return service;
        
        function request(config) {
            
            if (angular.isUndefined(config.params)) {
                config.params = {};
            }
            
            config.params.api_key = PAGAR_ME_CONFIG.apiKey;
            
            return config;
        }
        
    }
})();