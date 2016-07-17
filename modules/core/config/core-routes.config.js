(function () {
    'use strict';

    // Define as rotas
    angular.module('core').config([
        '$stateProvider', 
        '$urlRouterProvider',
        CoreRoutersConfig
    ]);

    /**
     * @ngdoc overview
     * @name core.config:CoreRoutersConfig
     * 
     * @requires $stateProvider
     * @requires $urlRouterProvider
     * 
     * @description
     * Set module routes and prevents when the page is not found.
     */
    function CoreRoutersConfig($stateProvider, $urlRouterProvider) {

        // Redirects to the 404 page when the route is not found
        $urlRouterProvider.otherwise(function ($injector) {
            $injector.get('$state').transitionTo('error.404', null, {
                location: false
            });
        });
        
        $stateProvider        
            // Main page
            .state('main', {
                abstract: true,
                url: '',
                views: {
                    'header': {
                        templateUrl: 'core/views/header.view.html'
                    },
                    '': {
                        templateUrl: 'core/views/main.view.html'
                    }
                }
            })
            .state('main.home', {
                url: '/home',
                templateUrl: 'core/views/home.view.html'
            })
            
            // Error page
            .state('error', {
                url: '/error',
                templateUrl: 'core/views/error.view.html'
            })
            .state('error.404', {
                url: '/404',
                templateUrl: 'core/views/error.404.view.html',
                data: {
                    ignoreState: true
                }
            });
    }
})();