/**
 * @ngdoc object
 * @name core.app:AppInit
 *
 * @description
 * Defines the main module adding its dependencies and initialize the AngularJS 
 * application.
 */
(function () {
    'use strict';
    
    /* global AppConfig */
    
    // Defines the main module adding its dependencies.
    angular.module(AppConfig.moduleName, AppConfig.vendorDependencies);
    
    // initialize the AngularJS application.
    angular.element(document).ready(function () {
        angular.bootstrap(document, [AppConfig.moduleName]);
    });
    
})();
