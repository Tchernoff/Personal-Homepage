var gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let cleanCSS = require('gulp-clean-css');
let browserSync = require('browser-sync').create();


gulp.task('watcher', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('styles/scss/main.scss', gulp.series('css'));
    //gulp.watch(paths.script, ['scripts']);
    gulp.watch('index.html', gulp.series('html'));
});


var reload = browserSync.reload;

// ////////////////////////////////////////////////
// CSS
// ////////////////////////////////////////////////
gulp.task('css', function () {
    return gulp.src('styles/scss/main.scss')
        .pipe(sass({
            // includePaths: require('node-normalize-scss').with('other/path', 'another/path')
            // - or -
            includePaths: require('node-normalize-scss').includePaths
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 5 version', 'ie 8'],
            cascade: false}))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({stream:true}));
});


gulp.task('html', function () {
   return gulp.src('index.html')
    .pipe(browserSync.reload({stream:true}));
});



gulp.task('default', gulp.series(
    gulp.parallel( 'watcher')
));
