var gulp = require('gulp'),
    babel = require('gulp-babel');
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    del = require('del'),
    rename = require('gulp-rename');

gulp.task('scripts', function(){
    gulp.src(['app/js/*.js','!app/js/*.min.js'])
    .pipe(plumber())
    .pipe(babel({
        presets: ['env']
        }))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('sass', function() {
    gulp.src(['app/scss/*.scss'])
    .pipe(plumber())
    .pipe(concat('style.css'))
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('html', function() {
    gulp.src('app/*.html')
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function(){
    browserSync({
        server: {
            baseDir: "./app/"
        }
    });
});

gulp.task('build:serve', function(){
    browserSync({
        server: {
            baseDir: "./build/"
        }
    });
});

gulp.task('build:cleanfolder', function(cb){
    return del([
        'build/**'
    ]);
});

gulp.task('build:copy', ['build:cleanfolder'], function() {
    return gulp.src('app/**/*/')
    .pipe(gulp.dest('build/'));
});

gulp.task('build:remove', ['build:copy'], function(cb){
    del([
        'build/scss/',
        'build/js/!(*.min.js)'
    ]);
});

gulp.task('build', ['build:copy','build:remove']);

gulp.task('watch', function(){
    gulp.watch('app/js/*.js',['scripts'])
    gulp.watch('app/scss/*.scss',['sass'])
    gulp.watch('app/*.html',['html'])
});

gulp.task('default', ['scripts', 'sass', 'html', 'browser-sync', 'watch']);