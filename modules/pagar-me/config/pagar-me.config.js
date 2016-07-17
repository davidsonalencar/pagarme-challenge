(function () {
    'use strict';

    angular.module('pagarMe').constant('PAGAR_ME_CONFIG', 
        PagarMeConfig()
    );
    
    /**
     * @ngdoc object
     * @name pagarMe.constant:PAGAR_ME_CONFIG
     * @description
     * Object used to distribute the PagaeMe informations to the rest of the 
     * application.
     */
    function PagarMeConfig() {
        
        return {
            /**
             * @ngdoc property
             * @name baseUrl
             * @propertyOf pagarMe.constant:PAGAR_ME_CONFIG
             * @returns {String} Base URL of the PagarMe API.
             */
            baseUrl: 'https://api.pagar.me/1/',
            /**
             * @ngdoc property
             * @name encryptionKey
             * @propertyOf pagarMe.constant:PAGAR_ME_CONFIG
             * @returns {String} Encryption key used to encrypt sensitive 
             * information for API.
             */
            encryptionKey: 'ek_test_HnBxHzfMUe9r7COYMWRrib7RW7Qchd',
            /**
             * @ngdoc property
             * @name apiKey
             * @propertyOf pagarMe.constant:PAGAR_ME_CONFIG
             * @returns {String} User credential for all communications API.
             */
            apiKey: 'ak_test_RNLz8FaEngmYuyvbBR5hl7kHJBSQOX'
        };
        
    }
})();
