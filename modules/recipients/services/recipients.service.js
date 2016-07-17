(function () {
    'use strict';

    angular.module('recipients').factory('Recipients', [
        '$resource',
        'PAGAR_ME_CONFIG',
        RecipientsService
    ]);

    /**
     * @ngdoc service
     * @name recipients.service:Recipients
     * 
     * @requires $resource
     * @requires pagarMe.constant:PAGAR_ME_CONFIG
     * 
     * @description
     * This service is responsible for communication with the Recipients API.
     */
    function RecipientsService($resource, PAGAR_ME_CONFIG) {
        
        return $resource(PAGAR_ME_CONFIG.baseUrl+'recipients/:id');
        
    }
    
})();
