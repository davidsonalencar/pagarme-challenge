(function () {
    'use strict';

    angular.module('recipients').filter('recipientsTransferIntervalLabel', [
        RecipientsTransferIntervalLabelFilter
    ]);
    
    /**
     * @ngdoc filter
     * @name recipients.filter:recipientsTransferIntervalLabel
     * @kind function
     *
     * @description
     * Formats the identifier tranfer interval.
     *
     * @returns {string} The text changed.
     */
    function RecipientsTransferIntervalLabelFilter() {
        return function(value) {
            
            if(value) {
                
                var transferInterval = {
                    daily: 'Diário',
                    weekly: 'Semanal',
                    monthly: 'Mensal'
                };
                
                return transferInterval[value] || '';
                
            } else {
                return '';
            }
        };
    }
    
})();
    