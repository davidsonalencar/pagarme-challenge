(function () {
    'use strict';

    angular.module('pagarMe').constant('PAGAR_ME_CONFIG', PagarMeConfig());

    function PagarMeConfig() {
        
        return {
            baseUrl: 'https://api.pagar.me/1/',
            encryptionKey: 'ek_test_HnBxHzfMUe9r7COYMWRrib7RW7Qchd',
            apiKey: 'ak_test_RNLz8FaEngmYuyvbBR5hl7kHJBSQOX'
        };
        
    }
})();
