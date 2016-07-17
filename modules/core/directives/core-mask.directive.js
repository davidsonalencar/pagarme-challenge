(function () {
    'use strict';

    angular.module('core').directive('coreMask', [
        CoreMaskDirective
    ]);
    
    /**
     * @ngdoc directive
     * @name core.directive:core-mask
     * 
     * @restrict A
     *
     * @param {string} core-mask Value to be passed for the mask
     *
     * @description
     * Apply mask to the field based on the value passed by the directive.
     *
     * @example
     * <pre>
     * <input type="text" ng-model="text" core-mask="{{text | currency}}" />
     * </pre>
     */
    function CoreMaskDirective() {
        return {
            restrict: 'A', 
            require: ['ngModel'],
            scope: {
                coreMask: '@'
            },
            link: function (scope, element, attrs, ctrl) {
                
                var modelCtrl = ctrl[0];
                
                modelCtrl.$parsers.unshift(function(viewValue) {
                    return parseFloat(viewValue.replace(/[^0-9]*/g, '')) || 0;
                });
                
                var unbindWatch = scope.$watch('coreMask', function(value){
                    modelCtrl.$setViewValue(value);
                    modelCtrl.$render();
                });
                
                scope.$on('$destroy', function(){
                    unbindWatch();
                    unbindWatch = null;
                });
                element.on('$destroy', function () {
                    scope.$destroy();
                });
                
            }
        };
    }

})();