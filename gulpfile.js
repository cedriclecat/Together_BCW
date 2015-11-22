/**
 * Created by Brecht on 9/10/2015.
 */

var gulp = require('gulp'),
    csslint = require('gulp-csslint'),
    cssMinifier = require('gulp-minify-css'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),
    jsStylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    gutil = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

gulp.task("default",function(){
    //var jsWatcher = gulp.watch('./scripts/**/*.js', ['js-build']);
    //jsWatcher.on('change', function(event){
    //    console.log("File: " + event.path + " was " + event.type);
    //});
    var sassWatcher = gulp.watch('./sass/**/*.sass', ['sass']);
    sassWatcher.on('change', function(event){
        console.log("File: " + event.path + " was " + event.type);
    });
});

//gulp.task("js-build", function(){
//    gulp.src("./scripts/**/*.js")
//        .pipe(jshint())
//        .pipe(jshint.reporter(jsStylish))
//        .pipe(sourcemaps.init())
//        .pipe(concat("app.min.js"))
//        .pipe(uglify())
//        .pipe(sourcemaps.write())
//        .pipe(gulp.dest('.//dist/js/'))
//        .pipe(notify({message: 'js built'}));
//});

gulp.task("sass",function(){
    gulp.src("./sass/**/*.sass")
        .pipe(sass({
            compress: true
        }).on('error',gutil.log))
        .pipe(csslint({
            'ids': false
        }))
        .pipe(csslint.reporter("compact"))
        .pipe(autoprefixer('last 2 versions','ie9'))
        .pipe(sourcemaps.init())
        .pipe(cssMinifier({ keepBreaks: false }))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./dist/css/"))
});


gulp.task("copy-externals", function(){

    gulp.src("./bower_components/modernizr/modernizr.js")
        .pipe(gulp.dest("./dist/js"));
    gulp.src("./bower_components/jquery/dist/jquery.min.js")
        .pipe(gulp.dest("./dist/js/"));
    gulp.src("./bower_components/angular/angular.min.js")
        .pipe(gulp.dest("./dist/js/"));
    gulp.src("./bower_components/bootstrap/dist/css/bootstrap.min.css")
        .pipe(gulp.dest("./dist/css/"));
    gulp.src("./bower_components/bootstrap/dist/js/bootstrap.min.js")
        .pipe(gulp.dest("./dist/js/"));

});
