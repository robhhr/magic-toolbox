const gulp = require("gulp"),
    sourcemaps = require('gulp-sourcemaps');
    prettyError = require('gulp-prettyerror');
    autoprefixer = require('gulp-autoprefixer');
    terser = require("gulp-terser"),
    rename = require("gulp-rename"),
    browserSync = require('browser-sync').create(),
    eslint = require("gulp-eslint");
    sass = require('gulp-sass');
    uglifycss = require('gulp-uglifycss');

gulp.task('sass', function(done) {
    return gulp
        .src('./src/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(prettyError())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(uglifycss())
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest('./build/css'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task("scripts", function() {
    return gulp
      .src('./src/js/*.js')
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failAfterError())
      .pipe(terser())
      .pipe(rename({ extname: ".min.js" }))
      .pipe(gulp.dest("./build/js"));
});

gulp.task("reload", function(done) {
    browserSync.reload();
    done();
});
  
gulp.task('watch', function(done) {
    gulp.watch(["./src/js/*.js", "index.html"], gulp.series("scripts", "reload"));
    gulp.watch(["./src/sass/*.scss"], gulp.series('sass', "reload"));
    done();
});
  
  
gulp.task("default", gulp.parallel("watch", "browser-sync"));