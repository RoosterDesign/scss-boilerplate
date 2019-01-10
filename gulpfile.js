'use strict';
 
const gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    rename = require('gulp-rename');

    var onError = function (err) {  
        notify.onError({
              title:    "Gulp",
              subtitle: "Failure!",
              message:  "Error: <%= error.message %>",
              sound:    "Beep"
        })(err);
        this.emit('end');
      };
    

//   concat = require('gulp-concat'),
//   uglify = require('gulp-uglify'),


// SCSS

sass.compiler = require('node-sass');
gulp.task('sass', function () {

    const plugins = [
        require('autoprefixer')({
            browsers: ['last 2 versions'],
            cascade: false
        }),
        require('cssnano')(),
        require("css-mqpacker")()
    ];

    return gulp.src('./src/css/*.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe( sourcemaps.init() )
        .pipe( sass({
            includePaths: require('node-normalize-scss').includePaths
        }).on('error', sass.logError) )


        // .pipe(postcss([
        //     require('autoprefixer')({}),
        //     require('cssnano')
        //   ]))


        .pipe(postcss(plugins))
        .pipe( rename({ suffix: '.min' }) )
        .pipe( sourcemaps.write('./') )
        .pipe( gulp.dest('./dist/css') );
});

/*
gulp.task('less', function() {
  return gulp.src('./css/src/styles.less')
    .pipe(plumber({errorHandler: onError}))
    .pipe(less({ paths: [ path.join(__dirname, 'less', 'includes') ] }))
    .pipe(combineMq())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./css/dist/'));
});
*/


// Scripts
/*
gulp.task('scripts', function() {
  gulp.src(['./js/src/main.js'])
    .pipe(plumber({errorHandler: onError}))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./js/dist/'))
});
*/


// Watch/Default Tasks
gulp.task('watch', function () {
    gulp.watch('./src/css/**/*.scss', ['sass']);
    // gulp.watch('./js/src/**/*.js', ['scripts']);  
});
// gulp.task('default', ['watch', 'sass', 'scripts']);
gulp.task('default', ['watch', 'sass']);