var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  cssnano = require('gulp-cssnano'),
  plumber = require('gulp-plumber'),
  bs = require('browser-sync').create(),
  eslint = require('gulp-eslint'),
  notify = require('gulp-notify');

var plumberErrorHandler={
  errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%=error.message %>' //Willsee what the error is if not able to compile sass file.
  })
};


gulp.task('scripts', function(){ //Runs the task default
    gulp.src('./js/*.js') //Which files that gulp will work with
      .pipe(plumber(plumberErrorHandler))
      .pipe(uglify())  //Modify using uglify function , which minifies
      .pipe(rename({ extname: '.min.js' })) //changes the name to the modified
      .pipe(gulp.dest('./build/js')) //Where we put the result
    });

// Watch scss AND html files, doing different things with each.


gulp.task('browser-sync', function() {
  bs.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('sass', function() {
 gulp.src('./sass/style.scss')
 .pipe(plumber(plumberErrorHandler))
 .pipe(sass())
 .pipe(autoprefixer({
   browsers: ['last 2 versions']
 }))
 .pipe(gulp.dest('./build/css'))
 .pipe(cssnano())
 .pipe(rename('style.min.css'))
 .pipe(gulp.dest('./build/css'));
});

gulp.task('watch', ['browser-sync'], function() {
  gulp.watch('js/*.js', ['scripts']);
  gulp.watch('sass/*.scss', ['sass']);
  gulp.watch(["build/css/*.css", "build/js/*.js"]).on('change', bs.reload);
});

 gulp.task('lint', function() {
   return gulp.src('js/*.js')
   .pipe(eslint())
   .pipe(eslint.format())
   .pipe(eslint.failOnError());
 });


 gulp.task('hello', function(){
  console.log('Hello Everybody! Inflammable means flammable? What a country! ');
});
// Modify our default task method by passing an array of task names

gulp.task('default', ['hello', 'scripts', 'browser-sync', 'watch', 'lint']);