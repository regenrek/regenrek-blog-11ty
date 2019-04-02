var postcss = require('gulp-postcss');
var gulp    = require('gulp');

/*
  generate the css with postcss
*/
gulp.task('css', function () {
    return gulp.src('./assets/css/*.pcss')
        .pipe(postcss())
        .pipe(gulp.dest('./_site/_includes/css'))
        .pipe(gulp.dest('./dist/css'));
});
