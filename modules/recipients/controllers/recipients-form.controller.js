(function () {
    'use strict';

    angular.module('recipients').controller('RecipientsFormController', [
        'Recipients',
        '$state',
        '$stateParams',
        '$filter',
        RecipientsFormController
    ]);
    
    /**
     * @ngdoc controller
     * @name recipients.controller:RecipientsFormController
     * 
     * @requires recipients.service:Recipients
     * @requires $state
     * @requires $stateParams
     * @requires $filter
     * 
     * @description
     * This controller will intialize recipient from API and add or update if
     * necessary.
     */
    function RecipientsFormController(Recipients, $state, $stateParams, $filter) {
        
        //-- private variables
        var ctrl = this;
        
        //-- public variables
        
        /**
         * @ngdoc property
         * @name transferIntervalOptions
         * @propertyOf recipients.controller:RecipientsFormController
         * @returns {Array} Transfer interval list.
         */
        ctrl.transferIntervalOptions = $.map(['daily', 'weekly', 'monthly'], function(value){
            return {
                id: value,
                name: $filter('recipientsTransferIntervalLabel')(value)
            };
        });
        
        /**
         * @ngdoc property
         * @name recipient
         * @propertyOf recipients.controller:RecipientsFormController
         * @returns {Recipients} {@link recipients.service:Recipients Recipients} service for show in form.
         */
        ctrl.recipient = new Recipients({
            transfer_interval: ctrl.transferIntervalOptions[0].id,
            transfer_enabled: true,
            legal_name: ''
        });
        
        //-- private methods

        //-- public methods
        ctrl.save      = save;
        ctrl.formTitle = formTitle;

        return init();
        
        //-- initialization methods

        /**
         * @description 
         * Performs initialization controller, event configuration and definition 
         * of watcher
         */
        function init() {
            
            if (angular.isDefined($stateParams.id)) {
                getRecipient($stateParams.id).then(function(recipient){
                    ctrl.recipient = recipient;
                });
            } 
                        
        }
        
        /**
         * @ngdoc method
         * @name save
         * @methodOf recipients.controller:RecipientsFormController
         * 
         * @param {Recipients} recipient Recipient service.
         * 
         * @description 
         * Add or update the recipient and next return to list.
         */
        function save(recipient) {
            
            var promise;
            if (angular.isDefined($stateParams.id)) {
                promise = recipient.$update();
            } else {
                promise = recipient.$save();
            }
            promise.then(function(){
                $state.go('^');
            });
            
        }
        
        /**
         * @ngdoc method
         * @name formTitle
         * @methodOf recipients.controller:RecipientsFormController
         * 
         * @description 
         * Returns the title of the form to indicate whether you inclusion or 
         * update.
         */
        function formTitle() {
            var title;
            if (angular.isDefined($stateParams.id)) {
                title = 'Alterar';
            } else {
                title = 'Adicionar';
            }
            return title;
        }
        
        /**
         * @param {String} id Recipient identifier
         * @returns {Promise} Return a promise of the recipient.
         * @description 
         * Get the recipient data from a identifier.
         */
        function getRecipient(id) {
            
            return Recipients.get({
                id: id
            }).$promise;
            
        }
        
    }
    
})();