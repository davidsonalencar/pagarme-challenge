(function () {
    'use strict';

    angular.module('core').filter('coreYesNoLabel', [
        CoreYesNoLabelFilter
    ]);

    /**
     * @ngdoc filter
     * @name core.filter:coreYesNoLabel
     * @kind function
     *
     * @description
     * Format a Boolean value to the values `Sim` or `Não`.
     *
     * @returns {string} The text changed.
     */
    function CoreYesNoLabelFilter() {
        return function(value) {
            return value ? 'Sim' : 'Não';
        };
    }
    
})();
    