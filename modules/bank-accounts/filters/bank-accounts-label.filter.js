(function () {
    'use strict';

    angular.module('bankAccounts').filter('bankAccountsLabel', [
        BankAccountsLabelFilter
    ]);
    
    /**
     * @ngdoc filter
     * @name bankAccounts.filter:bankAccountsLabel
     * @function
     *
     * @description
     * Filter used to assist in the assembly of the bank account label.
     *
     * @returns {String} The text changed.
     */
    function BankAccountsLabelFilter() {
        return function(value) {
            if(value) {
                var agenciaDvLabel = '';
                if (angular.isDefined(value.agencia_dv) && value.agencia_dv !== null) {
                    agenciaDvLabel = '-'+value.agencia_dv;
                }
                    
                return value.conta+'-'+value.conta_dv+' / '+value.agencia+agenciaDvLabel;
            } else {
                return '';
            }
        };
    }
    
})();
    