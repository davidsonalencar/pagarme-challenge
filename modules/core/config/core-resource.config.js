(function () {
    'use strict';

    angular.module('core').config([
        '$resourceProvider',
        CoreResourceConfig
    ]);

    /**
     * @ngdoc overview
     * @name core.config:CoreResourceConfig
     * 
     * @requires $resourceProvider
     * 
     * @description
     * Configure $resource to add action `update` with method `PUT`.
     */
    function CoreResourceConfig($resourceProvider) {
        
        $resourceProvider.defaults.actions = angular.extend($resourceProvider.defaults.actions, {
            update: {
                method: 'PUT',
                params: {
                    id: '@id'
                }
            }
        });

    }
})();