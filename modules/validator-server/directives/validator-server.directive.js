(function () {
    'use strict';

    angular.module('validatorServer').directive('validatorServer', [
        'VALIDATOR_SERVER_EVENT', 
        '$compile',
        ValidatorServerDirective
    ]);

    /**
     * @ngdoc directive
     * @name validatorServer.directive:validator-server
     * 
     * @requires validatorServer.constant:VALIDATOR_SERVER_EVENT
     * @requires $compile
     * 
     * @restrict A
     *
     * @description
     * Diretiva used to automate the display of validation messages based on 
     * data obtained by the API.
     *
     * @example
     * <pre>
     * <form name="formField">
     *    <div>
     *       <input type="text" name="field" ng-model="field" validator-server="" />
     *    </div>
     * </form>   
     * </pre>
     * 
     * # Example after processing
     * 
     * <pre>
     * <form name="formField">
     *    <div>
     *       <input type="text" name="field" ng-model="field" validator-server="" />
     *       <div ng-messages="formField.field.$error" class="uk-form-help-block">
     *          <div ng-message="ng-message">
     *             {{formField.field.$error.server}}
     *          </div>
     *       </div>
     *    </div>
     * </form>   
     * </pre>
     */
    function ValidatorServerDirective(VALIDATOR_SERVER_EVENT, $compile) {
        return {
            restrict: 'A',
            require: ['ngModel', '^form'],
            link: function (scope, element, attrs, ctrls) {

                scope.$evalAsync(function () {

                    /**
                     * Initializes variables
                     */
                    var ngModelCtrl = ctrls[0];
                    var formCtrl = ctrls[1];

                    if (!ngModelCtrl.$name) {
                        return;
                    }
                    
                    buildNgMessages(scope, element, formCtrl, ngModelCtrl);

                    /**
                     * When the submit event of the form is triggered checks was returned error message
                     */
                    var unbindEvent = scope.$on(VALIDATOR_SERVER_EVENT, function (event, data) {
                        
                        var errors = data.errors.filter(function (error) {
                            return error.parameter_name === ngModelCtrl.$name;
                        });
                        
                        if (errors && errors.length) {
                            ngModelCtrl.$setValidity('server', false);
                            
                            angular.forEach(errors, function (error) {
                                
                                error.message = error.message.charAt(0).toUpperCase() + error.message.slice(1);

                                if (!angular.isString(ngModelCtrl.$error.server)) {
                                    ngModelCtrl.$error.server = error.message;
                                } else {
                                    ngModelCtrl.$error.server = ngModelCtrl.$error.server.replace(/\.$/, '') + '; ' + error.message;
                                }
                                
                            });
                        }
                        
                    });

                    /**
                     * Clean message errors
                     */
                    ngModelCtrl.$validators.server = function () {
                        ngModelCtrl.$setValidity('server', true);
                        delete ngModelCtrl.$error.server;
                        return true;
                    };

                    /**
                     * On destroy
                     */
                    scope.$on('$destroy', function () {
                        unbindEvent();
                        unbindEvent = null;
                    });
                    element.on('$destroy', function () {
                        scope.$destroy();
                    });
                });
            }

        };
        
        function buildNgMessages(scope, element, formCtrl, ngModelCtrl) {
            
            var container = element.closest('div'),
                messages = container.find('ng-messages,[ng-messages]'),
                message = null,
                propertyErrorName = formCtrl.$name+'.'+ngModelCtrl.$name+'.$error';

            // ng-messages element
            if (!messages.length) {
                messages = $('<div>', {
                    class: 'uk-form-help-block',
                    'ng-messages': propertyErrorName
                });
                container.append(messages);
            }
            
            // ng-message element
            message = $('<div/>', {
                'ng-message': 'server'
            }).text('{{' + propertyErrorName + '.server}}');
            messages.append(message);
            
            // Compile content
            messages = $compile(messages)(scope);
            
            // Adiciona depois do elemento input
            //element.after(messages);
            //container.append(messages);
            
        }
        
    }

})();