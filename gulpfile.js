var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

// Server task
gulp.task('server', ['copy', 'sass', 'scripts'], function() {
  browserSync.init({
    server: './build'
  });
});

// Copy task
gulp.task('copy', function() {
  gulp.src('app/index.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.stream());
});

// Sass task
gulp.task('sass', function() {
  gulp.src('app/sass/*.scss')
    .pipe(sass({
        outputStyle: 'compressed'
      }))
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.stream());
});

// Scripts task
gulp.task('scripts', function(){
  gulp.src('app/scripts/*.js')
    .pipe(gulp.dest('build/js'))
    .pipe(browserSync.stream());
});

// Watch task
gulp.task('watch', function() {
  gulp.watch('app/index.html', ['copy']);
  gulp.watch('app/sass/*.scss', ['sass']);
  gulp.watch('app/scripts/*.js', ['scripts']);
});

// Default task
gulp.task('default', ['server', 'watch']);

