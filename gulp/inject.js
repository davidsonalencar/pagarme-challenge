/**
 * @author Davidson Alencar <davidson.t.i@gmail.com>
 * @description 
 * Task used to dynamically inject all JS, CSS both the project and the libraries 
 * in the index.html file
 */
(function () {
    'use strict';

    //-- Initializations
    var gulp    = require('gulp'),
        inject  = require('gulp-inject'),
        wiredep = require('wiredep').stream,
        paths   = gulp.paths;

    //-- Task inject
    gulp.task('inject', ['sass'], function () {

        var injectStyles = gulp.src([
            paths.public + '/*.css'
        ], {
            read: false
        });

        var injectScripts = gulp.src(paths.assets.js);

        var injectOptions = {
            ignorePath: [paths.modules, paths.public],
            addRootSlash: false
        };

        var wiredepOptions = {
            ignorePath: /^\.\.\/public\//
        };

        return gulp.src(paths.modules + '/index.html')
            .pipe(inject(injectStyles, injectOptions))
            .pipe(inject(injectScripts, injectOptions))
            .pipe(wiredep(wiredepOptions))
            .pipe(gulp.dest(paths.public));

    });
})();