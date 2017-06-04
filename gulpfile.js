const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync');

gulp.task('hello', () => {
  console.log('hello zell')
})

gulp.task('sass', () => {
  console.log('starting sass');
  return gulp.src('style/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('css'));
});

gulp.task('watch', () => {
  gulp.watch('style/scss/**/*.scss', ['sass']);
});
