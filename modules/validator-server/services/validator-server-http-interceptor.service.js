(function () {
    'use strict';

    angular.module('validatorServer').factory('ValidatorServerHttpInterceptor', [
        'VALIDATOR_SERVER_EVENT', 
        '$q', 
        '$rootScope',
        ValidatorServerHttpInterceptorService
    ]);

    /**
     * @ngdoc service
     * @name validatorServer.service:ValidatorServerHttpInterceptor
     * @kind object
     *
     * @requires validatorServer.constant:VALIDATOR_SERVER_EVENT
     * @requires $q
     * @requires $rootScope
     *
     * @description
     * Service used to intercept HTTP response errors to trigger the 
     * `VALIDATOR_SERVER_EVENT` event where the `validator-server` directive get the 
     * data of the response error and them show as messages in the form.
     */
    function ValidatorServerHttpInterceptorService(VALIDATOR_SERVER_EVENT, $q, $rootScope) {
        var service = {
            responseError: responseError
        };
        return service;
        
        function responseError (rejection) {

            if (rejection.status && rejection.status === 400) {                    
                $rootScope.$broadcast(VALIDATOR_SERVER_EVENT, {
                    errors: angular.isDefined(rejection.data.errors) ? rejection.data.errors : []
                });
            }
            // otherwise, default behaviour
            return $q.reject(rejection);
        }
    }
})();