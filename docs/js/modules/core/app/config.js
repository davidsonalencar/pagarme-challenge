// Inicializa a configuração do módulo da aplicativo para aplicação AngularJS
/*eslint-disable no-unused-vars*/
var AppConfig = (function () {
    'use strict';
    
    // Inicializa as opções da configuralçao do nódulo 
    var appModuleName = 'pagarmeChallenge';
    var appVendorDependencies = [
        'ngResource', //
        'ngLocale',
        'ngMessages',
        'ui.router'   // Utilizado para definir todas as rotas do app
    ];
    
    // Adiciona um novo módulo
    var registerModule = function (moduleName, dependencies) {
        // Cria o módulo do angular
        angular.module(moduleName, dependencies || []);

        // Adiciona o módulo para o arquivo de configuração do AngularJS
        angular.module(appModuleName).requires.push(moduleName);
    };

    return {
        moduleName: appModuleName,
        vendorDependencies: appVendorDependencies,
        registerModule: registerModule        
    };
})();
/*eslint-enable no-unused-vars*/