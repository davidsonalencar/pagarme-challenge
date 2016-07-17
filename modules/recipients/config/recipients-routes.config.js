(function () {
    'use strict';

    angular.module('recipients').config([
        '$stateProvider', 
        '$urlRouterProvider',
        RecipientsRoutersConfig
    ]);
    
    /**
     * @ngdoc overview
     * @name recipients.config:RecipientsRoutersConfig
     * 
     * @requires $stateProvider
     * @requires $urlRouterProvider
     * 
     * @description
     * Set module routes of the recipients.
     */
    function RecipientsRoutersConfig($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .when('/recipients', '/recipients/list');

        $stateProvider        
            .state('main.recipients', {
                url: '/recipients',
                template: '<ui-view/>'
            })
            .state('main.recipients.list', {
                url: '/list',
                templateUrl: 'recipients/views/recipients-list.view.html',
                controller: 'RecipientsListController as ctrl'
            })
            .state('main.recipients.create', {
                url: '/create',
                templateUrl: 'recipients/views/recipients-form.view.html',
                controller: 'RecipientsFormController as ctrl'
            })
            .state('main.recipients.update', {
                url: '/update/:id',
                templateUrl: 'recipients/views/recipients-form.view.html',
                controller: 'RecipientsFormController as ctrl'
            });
            
    }
})();