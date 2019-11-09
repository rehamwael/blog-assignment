/*
  Gulp task Runner 
  this will help us minfied our CSS , javascript , optimize svg images into sprites
  Author: Reham Habbas
*/ 


const gulpLoadPlugins = require('gulp-load-plugins');
const $ = gulpLoadPlugins();
var gulp = require('gulp'),
    gutil = require('gulp-util'),
    gulpif = require('gulp-if'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename"),
    concat = require('gulp-concat');
var env,
    jsSources,
    sassSources,
    dev = true,
    sassStyle;
    
env = process.env.NODE_ENV || 'production';
//env = 'production';
if (env==='development') {
  outputDir = 'blog/';
  sassStyle = 'expanded';
} else {
  outputDir = 'blog/';
  sassStyle = 'compressed';
}    
    
jsSources = ['components/scripts/*.js'];
sassSources = ['components/sass/*.scss'];
    
gulp.task('log',function(){
  gutil.log('workflow');  
});

gulp.task('js', function() {
  gulp.src(jsSources)
    .pipe(concat('jsSources'))
    .pipe(rename({ basename: 'main.min.js' }))
    .pipe(gulpif(env === 'production', uglify()))
    .pipe(gulp.dest('js'))
});

gulp.task('sass', function() {
 gulp.src(sassSources)
    .pipe(sass({ outputStyle: sassStyle})
    .on('error', gutil.log))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR','IE 9']}))
    .pipe($.if(dev, $.sourcemaps.write()))
    .pipe(rename({}))
    .pipe(gulp.dest(''))
});


gulp.task('watch', function() {
  gulp.watch('components/sass/**/*.scss', ['sass']);
  gulp.watch(jsSources, ['js']);
});

gulp.task('default', ['sass', 'js', 'watch']);