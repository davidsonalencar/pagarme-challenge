/**
 * @author Davidson Alencar <davidson.t.i@gmail.com>
 * @description 
 * Task used to linter tool for identifying and reporting on patterns
 */
(function () {
    'use strict';
    
    //-- Initializations
    var gulp   = require('gulp'),
        eslint = require('gulp-eslint'),
        paths  = gulp.paths;

    //-- Task eslint
    gulp.task('eslint', function() {
        return gulp.src( paths.assets.js )
            // Attaches the lint output to the "eslint" property 
            // of the file object so it can be used by other modules. 
            .pipe(eslint())
            // Outputs the lint results to the console. 
            .pipe(eslint.format());
    });
    
})();