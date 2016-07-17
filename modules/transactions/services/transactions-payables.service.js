(function () {
    'use strict';

    angular.module('transactions').factory('TransactionsPayables', [
        '$resource',
        'PAGAR_ME_CONFIG', 
        TransactionsPayablesService
    ]);
    
    /**
     * @ngdoc service
     * @name transactions.service:TransactionsPayables
     * 
     * @requires $resource
     * @requires pagarMe.constant:PAGAR_ME_CONFIG
     * 
     * @description
     * This service is responsible for communication with the Transactions 
     * Payables API.
     */
    function TransactionsPayablesService($resource, PAGAR_ME_CONFIG) {
        
        return $resource(PAGAR_ME_CONFIG.baseUrl+'transactions/:transaction_id/payables/:id');
        
    }
    
})();
