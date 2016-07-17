(function () {
    'use strict';
    
    /* global AppConfig */
    
    // Define o módulo principal acrescentando suas dependências 
    angular.module(AppConfig.moduleName, AppConfig.vendorDependencies);
    
    // Inicializa a aplicação AngularJs
    angular.element(document).ready(function () {
        angular.bootstrap(document, [AppConfig.moduleName]);
    });
    
})();
