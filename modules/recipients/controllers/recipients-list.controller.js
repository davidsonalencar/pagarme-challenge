(function () {
    'use strict';

    angular.module('recipients').controller('RecipientsListController', [
        'Recipients',
        RecipientsListController
    ]);
    
    /**
     * @ngdoc controller
     * @name recipients.controller:RecipientsListController
     * 
     * @requires recipients.service:Recipients
     * 
     * @description
     * This controller will get all recipients from API and will list them.
     */
    function RecipientsListController(Recipients) {
        
        //-- private variables
        var ctrl = this;
        
        //-- public variables
        
        /**
         * @ngdoc property
         * @name recipients
         * @propertyOf recipients.controller:RecipientsListController
         * @returns {Array} Recipients list.
         */
        ctrl.recipients = [];
        
        //-- private methods

        //-- public methods

        return init();
        
        //-- initialization methods

        /**
         * @description 
         * Performs initialization controller, event configuration and definition 
         * of watcher
         */
        function init() {
            
            getRecipients().then(function(recipients){
                ctrl.recipients = recipients;
            });
            
        }
        
        /**
         * @returns {Promise} Return a promise of the recipients array.
         * @description 
         * Gets from API the list of all recipients.
         */
        function getRecipients() {
            return Recipients.query().$promise;
        }
        
    }
    
})();