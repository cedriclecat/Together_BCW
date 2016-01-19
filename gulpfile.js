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
    sass = require('gulp-sass'),
    ngAnnotate = require('gulp-ng-annotate'),
    imageMin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');


var event = ['./public/src/app.js','./public/src/models/Event.js','./public/src/controllers/EventController.js'];
var admin = ['./public/src/app.js','./public/src/services/userService.js','./public/src/services/eventService.js', './public/src/services/groupService.js','./public/src/services/adminService.js','./public/src/controllers/AdminController.js'];
var profile = ['./public/src/app.js','./public/src/services/mStatusService.js','./public/src/services/jobService.js','./public/src/services/countryService.js','./public/src/services/certainUserService.js', './public/src/controllers/ProfileController.js'];


gulp.task("default",function(){
    var jsWatcher = gulp.watch('./public/scripts/**/*.js', ['js-build']);
    jsWatcher.on('change', function(event){
        console.log("File: " + event.path + " was " + event.type);
    });
    var sassWatcher = gulp.watch('./sass/**/*.sass', ['sass']);
    sassWatcher.on('change', function(event){
        console.log("File: " + event.path + " was " + event.type);
    });
    var imageWatcher = gulp.watch('./public/img/**/*.png', ['images']);
    imageWatcher.on('change', function(event){
        console.log("File: " + event.path + " was " + event.type);
    });
});

gulp.task('images', function() {
    gulp.src('./public/img/**/*.png')
        .pipe(imageMin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./public/dist/images'));
});

gulp.task("together", function(){
    gulp.src('./public/dist/js/together.js')
        .pipe(jshint())
        .pipe(jshint.reporter(jsStylish))
        .pipe(sourcemaps.init())
        .pipe(concat('together.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/dist/js/'))
        .pipe(notify({message: 'js built'}));
});

gulp.task("event-js-build", function(){
    gulp.src(event)
        .pipe(jshint())
        .pipe(jshint.reporter(jsStylish))
        .pipe(sourcemaps.init())
        .pipe(concat('event-page.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/dist/js/'))
        .pipe(notify({message: 'js built'}));
});

gulp.task("admin-js-build", function(){
    gulp.src(admin)
        .pipe(jshint())
        .pipe(jshint.reporter(jsStylish))
        .pipe(sourcemaps.init())
        .pipe(concat('admin-page.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/dist/js/'))
        .pipe(notify({message: 'js built'}));
});

gulp.task("profile-js-build", function(){
    gulp.src(profile)
        .pipe(jshint())
        .pipe(jshint.reporter(jsStylish))
        .pipe(sourcemaps.init())
        .pipe(concat('profile-page.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/dist/js/'))
        .pipe(notify({message: 'js built'}));
});

gulp.task("sass",function(){
    gulp.src("./sass/**/*.sass")
        .pipe(sass({
            compress: true
        }).on('error',gutil.log))
        .pipe(csslint({
            'ids': false
        }))
        .pipe(csslint.reporter('compact'))
        .pipe(autoprefixer('last 2 versions','ie9'))
        .pipe(sourcemaps.init())
        .pipe(cssMinifier({ keepBreaks: false }))
        .pipe(concat('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./public/dist/css/"))
});


gulp.task("copy-externals", function(){

    gulp.src("./bower_components/modernizr/modernizr.js")
        .pipe(gulp.dest("./public/dist/js"));
    gulp.src("./bower_components/jquery/dist/jquery.min.js")
        .pipe(gulp.dest("./public/dist/js/"));
    gulp.src("./bower_components/angular/angular.min.js")
        .pipe(gulp.dest("./public/dist/js/"));
    gulp.src("./bower_components/angular-messages/angular-messages.min.js")
        .pipe(gulp.dest("./public/dist/js/"));
    gulp.src("./bower_components/angular-mocks/angular-mocks.js")
        .pipe(gulp.dest("./public/dist/js/"));
    gulp.src("./bower_components/angular-animate/angular-animate.min.js")
        .pipe(gulp.dest("./public/dist/js/"));
    gulp.src("./bower_components/bootstrap/dist/css/bootstrap.min.css")
        .pipe(gulp.dest("./public/dist/css/"));
    gulp.src("./bower_components/bootstrap/dist/js/bootstrap.min.js")
        .pipe(gulp.dest("./public/dist/js/"));
    gulp.src("./bower_components/bootstrap-fileinput/js/fileinput.min.js")
        .pipe(gulp.dest("./public/dist/js/"));
    gulp.src("./bower_components/bootstrap-fileinput/css/fileinput.min.css")
        .pipe(gulp.dest("./public/dist/css/"));

});
