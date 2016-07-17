/**
 * @author Davidson Alencar <davidson.t.i@gmail.com>
 * @description 
 * Main File Gulp used to dynamically load other files each with its responsibility
 */
(function(){
    'use strict';
    
    //-- Initializations
    var gulp = require('gulp');

    /**
     * @type object
     * @description 
     * Definition of paths which will be required for automatons processes
     */
    gulp.paths = {
        /**
         * @type String
         * @description 
         * Path of the modules where the business rules are applied.
         */
        modules: 'modules',
        /**
         * @type String
         * @description 
         * Public path.
         */
        public: 'public',
        /**
         * @type String
         * @description 
         * Test path.
         */
        test: 'test',
        /**
         * @type String
         * @description 
         * Docs path.
         */
        docs: 'docs',
        /**
         * @type object
         * @description
         * Path assets of the application
         */
        assets: {
            js: [
                'modules/core/app/config.js',
                'modules/core/app/init.js',
                'modules/core/**/*.js',
                'modules/*/*.js',
                'modules/*/config/*.js',
                'modules/*/**/*.js'
            ],
            views: [
                'modules/*/views/*.html',
                'modules/*/views/**/*.html'
            ],
            imgs: [
                'modules/*/imgs/**/*.jpg',
                'modules/*/imgs/**/*.png'
            ],
            sass: [
                'modules/*/scss/*/*.scss',
                'modules/*/scss/**/*.scss'
            ]
        }
    };

    /**
     * @description
     * Will be obtained all the files gulp each based on their responsibility.
     */
    require('require-dir')('./gulp');
})();