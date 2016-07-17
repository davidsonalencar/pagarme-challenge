(function () {
    'use strict';

    angular.module('transactions').factory('Transactions', [
        '$resource',
        'PAGAR_ME_CONFIG', 
        TransactionsService
    ]);
    
    /**
     * @ngdoc service
     * @name transactions.service:Transactions
     * 
     * @requires $resource
     * @requires pagarMe.constant:PAGAR_ME_CONFIG
     * 
     * @description
     * This service is responsible for communication with the Transactions API.
     */
    function TransactionsService($resource, PAGAR_ME_CONFIG) {
        
        var PAYMENT_METHOD_CREDIT_CARD = 'credit_card',
            PAYMENT_METHOD_BOLETO = 'boleto',
            resource = $resource(PAGAR_ME_CONFIG.baseUrl+'transactions/:id');
        
        resource.prototype = angular.extend({}, resource.prototype, {
            setPaymentMethodCreditCard: setPaymentMethodCreditCard,
            setPaymentMethodBoleto: setPaymentMethodBoleto,
            isPaymentMethodCreditCard: isPaymentMethodCreditCard,
            isPaymentMethodBoleto: isPaymentMethodBoleto
        });
        
        return resource;
        
        /**
         * @ngdoc method
         * @name setPaymentMethodCreditCard
         * @methodOf transactions.service:Transactions
         * 
         * @description
         * Set the payment method property as credit card.
         */
        function setPaymentMethodCreditCard() {
            var self = this;
            self.payment_method = PAYMENT_METHOD_CREDIT_CARD;
        }
        
        /**
         * @ngdoc method
         * @name setPaymentMethodBoleto
         * @methodOf transactions.service:Transactions
         * 
         * @description
         * Set the payment method property as boleto.
         */
        function setPaymentMethodBoleto() {
            var self = this;
            self.payment_method = PAYMENT_METHOD_BOLETO;
        }
        
        /**
         * @ngdoc method
         * @name isPaymentMethodCreditCard
         * @methodOf transactions.service:Transactions
         * 
         * @returns {Boolean} `True` if credit card, otherwise `False`.
         * 
         * @description
         * Check is payment method property is credit card.
         */
        function isPaymentMethodCreditCard() {
            var self = this;
            return self.payment_method === PAYMENT_METHOD_CREDIT_CARD;
        }
        
        /**
         * @ngdoc method
         * @name isPaymentMethodBoleto
         * @methodOf transactions.service:Transactions
         * 
         * @returns {Boolean} `True` if boleto, otherwise `False`.
         * 
         * @description
         * Check is payment method property is boleto.
         */
        function isPaymentMethodBoleto() {
            var self = this;
            return self.payment_method === PAYMENT_METHOD_BOLETO;
        }
        
    }
    
})();
