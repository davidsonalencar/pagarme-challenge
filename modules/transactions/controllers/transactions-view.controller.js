(function () {
    'use strict';

    angular.module('transactions').controller('TransactionsViewController', [
        'Transactions',
        'TransactionsPayables',
        'Recipients',
        '$stateParams',
        TransactionsViewController
    ]);
    
    /**
     * @ngdoc controller
     * @name transactions.controller:TransactionsViewController
     * 
     * @requires transactions.service:Transactions
     * @requires transactions.service:TransactionsPayables
     * @requires recipients.service:Recipients
     * @requires $stateParams
     * 
     * @description
     * This controller will get the data from an existing transaction from API 
     * and display the details of this transaction.
     */
    function TransactionsViewController(Transactions, TransactionsPayables, Recipients, $stateParams) {
        
        //-- private variables
        var ctrl = this;
        var recipientsData = [];
        
        //-- public variables
        
        /**
         * @ngdoc property
         * @name transaction
         * @propertyOf transactions.controller:TransactionsViewController
         * @returns {Transactions} {@link transactions.service:Transactions Transactions} service for show details in view.
         */
        ctrl.transaction = new Transactions({
            id: '000000'
        });

        //-- private methods

        //-- public methods
        ctrl.getPayablesBySplitRule = getPayablesBySplitRule;
        ctrl.getTotalLiquidAmountPayablesBySplitRule = getTotalLiquidAmountPayablesBySplitRule;
        ctrl.getLegalNameBankByRecipient = getLegalNameBankByRecipient;
        
        return init();
        
        //-- initialization methods

        /**
         * @description 
         * Performs initialization controller, event configuration and definition 
         * of watcher
         */
        function init() {
            
            getRecipients()
                .then(function(recipients){
                    recipientsData = recipients;
                    return getTransaction($stateParams.id);
                })
                .then(function(transaction){
                    ctrl.transaction = transaction;
                    return getTransactionPayables(ctrl.transaction.id);
                })
                .then(function(payables){
                    ctrl.transaction.payables = payables;                    
                });
            
        }
        
        /**
         * @param {int} id Transaction identifier.
         * @returns {Promise} Promise of transaction data.
         * 
         * @description 
         * Get the data of a particular transaction from a identifier.
         */
        function getTransaction(id) {
            
            return Transactions.get({
                id: id
            }).$promise;
            
        }
        
        /**
         * @param {int} transaction_id Transaction identifier.
         * @returns {Promise} Promise of payables list.
         * 
         * @description 
         * Gets a list of payables of a particular transaction.
         */
        function getTransactionPayables(transaction_id) {
            
            return TransactionsPayables.query({
                transaction_id: transaction_id
            }).$promise;
            
        }
        
        /**
         * @returns {Promise} Return a promise of the recipients array.
         * @description 
         * Gets from API the list of all recipients.
         */
        function getRecipients() {
            
            return Recipients.query().$promise;
            
        }
        
        /**
         * @ngdoc method
         * @name getPayablesBySplitRule
         * @methodOf transactions.controller:TransactionsViewController
         * 
         * @param {Array} payables List of the transaction payables.
         * @param {String} split_rule_id Split rule identifier.
         * @returns {Array} List of the transaction payables filtred.
         * 
         * @description 
         * Returns only the payables of a split rule.
         */
        function getPayablesBySplitRule(payables, split_rule_id) {
            
            if (!angular.isArray(payables)) {
                return [];
            }
            
            return payables.filter(function(payable){
                return payable.split_rule_id === split_rule_id;
            });
            
        }
        
        /**
         * @ngdoc method
         * @name getTotalLiquidAmountPayablesBySplitRule
         * @methodOf transactions.controller:TransactionsViewController
         * 
         * @param {Transactions} transaction Transaction service.
         * @param {Object} split_rule Split rule object.
         * @returns {Number} Total net value of a recipient.
         * 
         * @description 
         * Calculate the total net value of a recipient based on the split rules.
         * and payables.
         */
        function getTotalLiquidAmountPayablesBySplitRule(transaction, split_rule) {
            
            var total = 0;
            
            if (transaction.isPaymentMethodCreditCard()) {
                
                var payablesFromSplitRule = getPayablesBySplitRule(transaction.payables, split_rule.id);
            
                angular.forEach(payablesFromSplitRule, function(payable){
                    total += (payable.amount - payable.fee);
                });

            } else
            if (transaction.isPaymentMethodBoleto()) {
                
                total = transaction.amount - (transaction.amount * split_rule.percentage / 100);
                
            }
        
            return total / 100;
            
        }
        
        /**
         * @ngdoc method
         * @name getLegalNameBankByRecipient
         * @methodOf transactions.controller:TransactionsViewController
         * 
         * @param {String} recipient_id Recipient identifier.
         * @returns {String} Legal name bank.
         * 
         * @description 
         * Gets the legal name bank of a recipient.
         */
        function getLegalNameBankByRecipient(recipient_id) {
            
            var recipientFiltred = recipientsData.filter(function(recipient){
                return recipient.id === recipient_id;
            });
            
            if (!recipientFiltred.length) {
                return '';
            }
            
            return recipientFiltred[0].bank_account.legal_name;
            
        }
        
        
    }
    
})();