/**
 * @author Davidson Alencar <davidson.t.i@gmail.com>
 * @description 
 * Task used to catch all the sass files and include it in index.scss file and 
 * then compile it
 */
(function () {
    'use strict';

    //-- Initializations
    var gulp   = require('gulp'),
        inject = require('gulp-inject'),
        sass   = require('gulp-sass'),
        paths  = gulp.paths;

    //-- Task sass
    gulp.task('sass', function () {

        var injectSass = gulp.src(paths.assets.sass, {read: false});

        var injectOptions = {
            transform: function (filePath) {
                filePath = filePath.replace(paths.modules+'/', '../'+paths.modules+'/');
                return '@import \'' + filePath + '\';';
            },
            starttag: '// injector',
            endtag: '// endinjector',
            addRootSlash: false
        };

        return gulp.src([paths.modules + '/index.scss'])
            .pipe(inject(injectSass, injectOptions))
            .pipe(sass())
            .on('error', function handleError(err) {
                console.error(err.toString());
                this.emit('end');
            })
            .pipe(gulp.dest(paths.public));
    });
})();