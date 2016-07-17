/**
 * @author Davidson Alencar <davidson.t.i@gmail.com>
 * @description 
 * Main task that starts mini web service to automate the development
 */
(function () {
    'use strict';

    //-- Initializations
    var gulp        = require('gulp'),
        browserSync = require('browser-sync'),
        middleware  = require('./proxy'),
        paths       = gulp.paths;

    //-- Task serve
    gulp.task('serve', ['watch'], function () {

        var baseDir = [
            paths.public,
            paths.modules
        ];

        var files = [
            paths.public + '/index.html'
        ].concat(paths.assets.imgs)
         .concat(paths.assets.css)
         .concat(paths.assets.js)
         .concat(paths.assets.views);

        browserSyncInit(baseDir, files);
    });
    
    /**
     * Initialize instance of the browserSync
     * 
     * @param {Array} baseDir Base directory of the browser sync
     * @param {Array} files Files that will be loaded
     * @returns {void}
     */
    function browserSyncInit(baseDir, files) {
        var browser = 'default',
            routers = {
                '/docs': 'docs'
            };

        browserSync.instance = browserSync.init(files, {
            startPath: '/',
            server: {
                baseDir: baseDir,
                middleware: middleware,
                routes: routers
            },
            browser: browser
        });
    }
})();