/**
 * @author Davidson Alencar <davidson.t.i@gmail.com>
 * @description 
 * Observe all project assets to apply certain tasks
 */
(function () {
    'use strict';

    //-- Initializations
    var gulp  = require('gulp'),
        paths = gulp.paths;

    //-- Task watch
    gulp.task('watch', ['ngdocs', 'eslint', 'inject'], function () {

        gulp.watch([paths.modules + '/*.html'], ['inject']);
        gulp.watch(paths.assets.imgs, ['inject']);
        gulp.watch(paths.assets.sass, ['inject']);
        gulp.watch(paths.assets.js, ['ngdocs', 'eslint', 'inject']);
        gulp.watch(paths.assets.views, ['inject']);

    });
})();