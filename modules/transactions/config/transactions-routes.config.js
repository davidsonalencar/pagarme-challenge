(function () {
    'use strict';

    // Define as rotas
    angular.module('transactions').config([
        '$stateProvider', 
        '$urlRouterProvider',
        TransactionsRoutersConfig
    ]);

    /**
     * @ngdoc overview
     * @name transactions.config:TransactionsRoutersConfig
     * 
     * @requires $stateProvider
     * @requires $urlRouterProvider
     * 
     * @description
     * Set module routes of the transactions.
     */
    function TransactionsRoutersConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .when('/', '/transactions/create')
            .when('/transactions', '/transactions/create');

        $stateProvider        
            .state('main.transactions', {
                url: '/transactions',
                template: '<ui-view/>'
            })
            .state('main.transactions.create', {
                url: '/create',
                templateUrl: 'transactions/views/transactions-form.view.html',
                controller: 'TransactionsFormController as ctrl',
                resolve: {
                    recipientsOptions: ['Recipients', function(Recipients){
                        return Recipients.query().$promise;
                    }]
                }
            })
            .state('main.transactions.view', {
                url: '/view/:id',
                templateUrl: 'transactions/views/transactions-view.view.html',
                controller: 'TransactionsViewController as ctrl'
            });
            
    }
})();