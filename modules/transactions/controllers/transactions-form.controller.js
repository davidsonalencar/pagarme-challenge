(function () {
    'use strict';

    angular.module('transactions').controller('TransactionsFormController', [
        'PagarMe',
        'Transactions',
        'recipientsOptions',
        '$filter',
        '$state',
        '$q',
        TransactionsFormController
    ]);
    
    /**
     * @ngdoc controller
     * @name transactions.controller:TransactionsFormController
     * 
     * @requires pagarMe.service:PagarMe
     * @requires transactions.service:Transactions
     * @requires recipientsOptions
     * @requires $filter
     * @requires $state
     * @requires $q
     * 
     * @description
     * This controller will intialize transaction object, add a new transaction
     * from API and will redirect to the new view transaction details.
     */
    function TransactionsFormController(PagarMe, Transactions, recipientsOptions, $filter, $state, $q) {
        
        //-- private variables
        var ctrl = this;
        
        //-- public variables
        
        /**
         * @ngdoc property
         * @name recipientsOptions
         * @propertyOf transactions.controller:TransactionsFormController
         * @returns {Array} Recipients list.
         */
        ctrl.recipientsOptions = recipientsOptions;

        /**
         * @ngdoc property
         * @name transaction
         * @propertyOf transactions.controller:TransactionsFormController
         * @returns {Transactions} {@link transactions.service:Transactions Transactions} service for show in form.
         */
        ctrl.transaction = new Transactions({
            card_number: '5378373881528321',
            card_holder_name: 'Davidson Teste',
            card_expiration_month: '12',
            card_expiration_year: 2017,
            card_cvv: '828',
            amount: 32082,
            installments: 1,
            split_rules: [{
                recipient_id: recipientsOptions[0].id,
                charge_processing_fee: true,
                liable: true,
                percentage: 40
            }, {
                recipient_id: recipientsOptions[1].id,
                charge_processing_fee: true,
                liable: true,
                percentage: 60
            }]
        });
        ctrl.transaction.setPaymentMethodCreditCard();
        
        /**
         * @ngdoc property
         * @name installmentsOptions
         * @propertyOf transactions.controller:TransactionsFormController
         * @returns {Array} Installments list.
         */
        ctrl.installmentsOptions = $.map([1,2,3,4,5,6,7,8,9,10,11,12], function(value){
            return {
                id: value,
                name: value+'x'
            };
        });
        
        /**
         * @ngdoc property
         * @name cardExpirationMonthOptions
         * @propertyOf transactions.controller:TransactionsFormController
         * @returns {Array} Card expiration month list.
         */
        ctrl.cardExpirationMonthOptions = $.map(['01','02','03','04','05','06','07','08','09','10','11','12'], function(value) {
            return {
                id: value,
                name: value
            };
        });
        
        /**
         * @ngdoc property
         * @name cardExpirationYearOptions
         * @propertyOf transactions.controller:TransactionsFormController
         * @returns {Array} Card expiration year list.
         */
        ctrl.cardExpirationYearOptions = $.map([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14], function(date){
            var year;
            return function(value) {
                year = date.getFullYear()+value;
                return {
                    id: year,
                    name: year
                };
            };
        }(new Date()));
        
        //-- private methods

        //-- public methods
        ctrl.save = save;
        ctrl.installmentsAmountLabel = installmentsAmountLabel;

        return init();
        
        //-- initialization methods

        /**
         * @description 
         * Performs initialization controller, event configuration and definition 
         * of watcher
         */
        function init() {
        }
        
        /**
         * @ngdoc method
         * @name save
         * @methodOf transactions.controller:TransactionsFormController
         * 
         * @param {Transactions} transaction Transaction service.
         * 
         * @description 
         * It will be prepared to obfuscate the transaction confidential data 
         * from the credit card and then will save it.
         */
        function save(transaction) {

            prepareTransaction(transaction)
                .then(function(protectedTransaction){
                    return protectedTransaction.$save();
                })
                .then(function(protectedTransaction){
                    
                    $state.go('^.view', {
                        id: protectedTransaction.id
                    });
                    
                });
            
        }
        
        /**
         * @ngdoc method
         * @name installmentsAmountLabel
         * @methodOf transactions.controller:TransactionsFormController
         * 
         * @param {Transactions} transaction Transaction service.
         * @returns {String} Description of the amount per installment.
         * 
         * @description 
         * Calculate the transaction value per share and demonstrates this 
         * description.
         */
        function installmentsAmountLabel(transaction){
            var installmentsAmount = transaction.amount/100/transaction.installments;
            installmentsAmount = $filter('currency')(installmentsAmount);
            return transaction.installments+'X de '+installmentsAmount+' sem juros';
        }
        
        /**
         * @param {Transactions} transaction Transaction service.
         * 
         * @description 
         * Prepare the service transaction obscuring sensitive data credit card 
         * before sending to the API.
         */
        function prepareTransaction(transaction) {
            
            var protectedTransaction = angular.copy(transaction);
            
            delete protectedTransaction.card_number;
            delete protectedTransaction.card_holder_name;
            delete protectedTransaction.card_expiration_month;
            delete protectedTransaction.card_expiration_year;
            delete protectedTransaction.card_cvv;
            
            return $q(function(resolve, reject){
            
                if (transaction.isPaymentMethodCreditCard()) {
                    PagarMe.generateCardHash(transaction).then(function(cardHash){

                        protectedTransaction.card_hash = cardHash;
                        
                        resolve(protectedTransaction);

                    }, reject);
                } else {

                    resolve(protectedTransaction);

                } 
                
            });
            
        }
        
    }
    
})();