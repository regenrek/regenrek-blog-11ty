const gulp  = require('gulp');

/**
 All our gulp tasks rely inside gulp-tasks folder - better overview
 */
require('require-dir')('./gulp-tasks');

/*
  Watch folders for changess
*/
gulp.task("watch", function() {
    gulp.watch('./src/scss/**/*.scss', gulp.parallel('css'));
    gulp.watch('./src/js/**/*.js', gulp.parallel('js'));
});


/*
  Build project
*/
gulp.task('build', gulp.parallel(
    'css',
    'js'
));

/*
  Watch files and auto compile during dev
*/
gulp.task('dev', gulp.series(
    'build',
    'watch'
));






