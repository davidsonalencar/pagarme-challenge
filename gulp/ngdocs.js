/**
 * @author Davidson Alencar <davidson.t.i@gmail.com>
 * @description 
 * Task used to generate docs of the project
 */
(function () {
    'use strict';
    
    //-- Initializations
    var gulp   = require('gulp'),
        ngdocs = require('gulp-ngdocs'),
        paths  = gulp.paths;

    var ngdocsOptions = {
        html5Mode: false
    };
            
    //-- Task ngdocs
    gulp.task('ngdocs', function() {
        return gulp.src(paths.assets.js.concat(['./index.ngdoc']))
            .pipe(ngdocs.process(ngdocsOptions))
            .pipe(gulp.dest(paths.docs));
    });
    
})();