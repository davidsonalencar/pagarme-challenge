(function () {
    'use strict';

    angular.module('pagarMe').factory('PagarMe', [
        'PAGAR_ME_CONFIG', 
        'VALIDATOR_SERVER_EVENT', 
        '$rootScope', 
        '$q',
        PagarMeService
    ]);

    /**
     * @ngdoc service
     * @name pagarMe.service:PagarMe
     * @kind object
     *
     * @requires pagarMe.constant:PAGAR_ME_CONFIG
     * @requires validatorServe.constant:VALIDATOR_SERVER_EVENT
     * @requires $rootScope
     * @requires $q
     * 
     * @description
     * It provides whole mechanism to assist the communication with the API.
     */
    function PagarMeService(PAGAR_ME_CONFIG, VALIDATOR_SERVER_EVENT, $rootScope, $q) {
        
        /* global PagarMe */
        PagarMe.encryption_key = PAGAR_ME_CONFIG.encryptionKey;
        
        var service = {
            generateCardHash: generateCardHash
        };
        return service; 
       
        /**
         * @ngdoc method
         * @name generateCardHash
         * @methodOf pagarMe.service:PagarMe
         * 
         * @param {Object} payment Object used to inform credit card data.
         * 
         * @returns {Promise} Returns promise of the hash card.
         * 
         * @description 
         * Creates a secure data to transmit information from credit card to API.
         */
        function generateCardHash(payment){
                
            // Initializing a credit card object and complete with informed data
            var creditCard = new PagarMe.CreditCard();
            creditCard.cardHolderName = payment.card_holder_name;
            creditCard.cardExpirationMonth = payment.card_expiration_month;
            creditCard.cardExpirationYear = payment.card_expiration_year;
            creditCard.cardNumber = payment.card_number;
            creditCard.cardCVV = payment.card_cvv;

            return $q(function(resolve, reject){

                // Handle validation errors in form fields
                var fieldErrors = creditCard.fieldErrors();

                // Checks for errors
                if (Object.keys(fieldErrors).length) {

                    $rootScope.$broadcast(VALIDATOR_SERVER_EVENT, {
                        errors: normalizeFieldErrors(fieldErrors)
                    });
                    
                    reject(fieldErrors);
                } else {
                    
                    // If there are no errors, generates card_hash ...
                    creditCard.generateHash(function(cardHash) {
                        resolve(cardHash);
                    });
                    
                }

            });

        }
        
        /**
         * @param {Array} fieldErrors Errors fields from PagarMe library.
         * @returns {Array} Set of errors normalized.
         */
        function normalizeFieldErrors(fieldErrors) {
            
            return $.map(fieldErrors, function(message, parameterName){
                return {
                    message: message, 
                    parameter_name: parameterName,
                    type: 'invalid_parameter'
                };
            });
            
        }
        
    }
})();
