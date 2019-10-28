var gulp = require('gulp');
let cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var fileinclude = require('gulp-file-include');


gulp.task('concat', function () {
    //do sometime
    gulp.src('./dev/*.html').pipe(gulp.dest('./dest/'))
});

gulp.task('concatjs', function () {
    gulp.src('dev/js/*.js').pipe(gulp.dest('dest/js/'));
})

gulp.task('minicss', function () {
    gulp.src('dev/*.css')
        .pipe(cleanCSS({
            compatibility: 'ie8'}))
        .pipe(gulp.dest('dest/css'));
});

// SASS
gulp.task('sass', function () {
    return gulp.src('./dev/sass/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./dest/css'));
  });

//watch 
gulp.task('watch',function(){
gulp.watch('dev/sass/*.scss', ['sass'] );
});

//browser
gulp.task('template', function () {
    gulp.src(['dev/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dest'));
});


gulp.task('default',function () {
    browserSync.init({
        server: {
            //根目錄 可以把function放在參數裡執行完再回來做function
            baseDir: "./dest",
            index: "index.html"
        }
    });

    gulp.watch(["dev/sass/*.scss", "dev/sass/**/*.scss"] , ['sass']).on('change', reload);
    gulp.watch(["dev/*.html" , "dev/**/*.html"] , ['template']).on('change', reload);
    gulp.watch(["dev/*.html", "dev/**/*.html"] , ['concat']).on('change', reload);
    gulp.watch(["dev/js/*.js"] , ['concatjs']).on('change', reload);
});
