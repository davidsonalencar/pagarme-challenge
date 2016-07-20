/**
 * @ngdoc object
 * @name core.app:AppConfig
 * 
 * @description
 * Setting the application where the main module is named, defined dependencies 
 * and distributed a method to add other modules.
 */
/*eslint-disable no-unused-vars*/
var AppConfig = (function () {
    'use strict';

    /**
     * @ngdoc property
     * @name moduleName
     * @propertyOf core.app:AppConfig
     * @returns {String} Name of the application's main module.
     */
    var moduleName = 'pagarmeChallenge';

    /**
     * @ngdoc property
     * @name vendorDependencies
     * @propertyOf core.app:AppConfig
     * @returns {Array} List of dependencies of the main module.
     */
    var vendorDependencies = [
        'ngResource', 
        'ngLocale',
        'ngMessages',
        'ui.router'   
    ];

    /**
     * @ngdoc method
     * @name registerModule
     * @methodOf core.app:AppConfig
     * 
     * @param {String} newModuleName New module name to be added.
     * @param {Array=} newModuleDependencies List of dependencies of the new module.
     * 
     * @description 
     * Method used to automate the inclusion of other modules to the main 
     * application module.
     */
    var registerModule = function (newModuleName, newModuleDependencies) {
        
        angular.module(newModuleName, newModuleDependencies || []);
        angular.module(moduleName).requires.push(newModuleName);
        
    };

    return {
        moduleName: moduleName,
        vendorDependencies: vendorDependencies,
        registerModule: registerModule
    };
})();
/*eslint-enable no-unused-vars*/
