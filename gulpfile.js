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
    less = require('gulp-less'),
    gutil = require('gulp-util'),
    autoprefixer = require('gulp-autoprefixer'),
    coffee = require('gulp-coffee');

gulp.task("default",function(){
    var cssWatcher = gulp.watch('./public/stylesheets/**/*.css',['css-build']);
    cssWatcher.on('change',function(event){
        console.log("File: " + event.path + " was " + event.type);
    });
    var jsWatcher = gulp.watch('./public/scripts/**/*.js', ['js-build']);
    jsWatcher.on('change', function(event){
        console.log("File: " + event.path + " was " + event.type);
    });
    var lessWatcher = gulp.watch('./public/less/**/*.less', ['less-build']);
    lessWatcher.on('change', function(event){
        console.log("File: " + event.path + " was " + event.type);
    });
    var tsWatcher = gulp.watch('./public/typescript/**/*.ts', ['cs-build']);
    tsWatcher.on('change', function(event){
        console.log("File: " + event.path + " was " + event.type);
    });
});

gulp.task("js-build", function(){
    gulp.src("./public/scripts/**/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter(jsStylish))
        .pipe(sourcemaps.init())
        .pipe(concat("app.min.js"))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/dist/js'))
        .pipe(notify({message: 'js built'}));
});


gulp.task("css-build", function(){
    gulp.src("./public/stylesheets/*.css")
        .pipe(csslint({
            'ids': false
        }))
        .pipe(csslint.reporter("junit-xml"))
        .pipe(csslint.reporter("fail"))
        .pipe(sourcemaps.init())
        .pipe(cssMinifier())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/dist/css"));
});

gulp.task("less",function(){
    gulp.src("./public/less/**/*.less")
        .pipe(less({
            compress: true
        }).on('error',gutil.log))
        .pipe(autoprefixer('last 2 versions','ie9'))
        .pipe(sourcemaps.init())
        .pipe(cssMinifier({ keepBreaks: false }))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/dist/css/"));
});

//gulp.task("coffee",function(){
//    gulp.src("./public/scripts/**/*.coffee")
//        .pipe(coffee({
//            bare: true
//        }).on('error', gutil.log))
//        .pipe(jshint())
//        .pipe(jshint.reporter(jsStylish))
//        .pipe(sourcemaps.init())
//        .pipe(uglify())
//        .pipe(concat('coffee.min.js'))
//        .pipe(sourcemaps.write())
//        .pipe(gulp.dest("./public/dist/js/"))
//});

gulp.task("copy-externals", function(){

    gulp.src("./bower_components/modernizr/modernizr.js")
        .pipe(gulp.dest("./app/dist/js"));

    gulp.src("./bower_components/angular/angular.min.js")
        .pipe(gulp.dest("./public/dist/js/"));

});
