/**
 * Imported modules
 */
import gulp from 'gulp';
import autoprefixer from 'gulp-autoprefixer';
import bs from 'browser-sync';
import minifyCss from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import minifyJs from 'gulp-minify';
import babel from 'gulp-babel';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import watch from 'gulp-watch';
import merge from 'merge-stream';
import jsConcat from 'gulp-concat';
import cssConcat from 'gulp-concat-css';
import sass from 'gulp-sass';
import del from 'del';
import minifyHTML from 'gulp-htmlmin';
import nodemon from 'gulp-nodemon';

/**
 * Variables
 */
const browsersync = bs.create();
const reload = bs.reload;



gulp.task("sass", () => {
  return watch('dev/assets/css/sass/main.scss', () => {
    gulp.src('dev/assets/css/sass/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dev/assets/css'))
    .pipe(browsersync.reload({stream: true}));
  });
});



/**
 * Styles Task
 */
gulp.task("styles", () => {
  return watch('dev/assets/css/*.css', () => {
    gulp.src(['dev/assets/css/tether.min.css', 'dev/assets/css/bootstrap.min.css', 'dev/assets/css/main.css'])
    .pipe(plumber())
    .pipe(autoprefixer())
    .pipe(cssConcat("main.css"))
    .pipe(minifyCss())
    .pipe(gulp.dest('public/assets/css'))
    .pipe(browsersync.reload({stream: true}));
  });
});

/**
 * Images Task
 */
gulp.task('images', () => {
  return watch('dev/assets/images/**/*', () => {
    gulp.src('dev/assets/images/**/*')
      .pipe(imagemin({
        progressive: true
      }))
      .pipe(plumber())
      .pipe(gulp.dest('public/assets/images'))
      .pipe(browsersync.reload({stream: true}));
  });
});

/**
 * HTML Task
 */
gulp.task('html', () => {
  return watch('dev/**/*.html', () => {
    gulp.src('dev/**/*.html')
    .pipe(minifyHTML({collapseWhitespace: true}))
    .pipe(gulp.dest('public/'))
    .pipe(browsersync.reload({stream: true}));
  });
});


/**
 * Fonts Task
 */

gulp.task('transferFonts', () => {
  return gulp.src('dev/assets/fonts/**')
    .pipe(gulp.dest('public/assets/fonts'))
});

gulp.task('fonts', () => {
  return watch('dev/assets/fonts/**/*.*', () => {
    gulp.src('dev/assets/fonts/**/*.*')
    .pipe(gulp.dest('public/assets/fonts'))
    .pipe(browsersync.reload({stream: true}));
  });
});


/**
 * Scripts Task
 */
gulp.task('scripts', () => {
  return watch(['dev/assets/js/*.js', 'dev/app/*.js'], () => {
    gulp.src([
      'dev/assets/js/jquery.min.js', 
      'dev/assets/js/tether.min.js', 
      'dev/assets/js/bootstrap.min.js', 
      'dev/assets/js/angular.min.js',
      'dev/assets/js/angular-route.min.js',
      'dev/assets/js/angular-animate.min.js',
      'dev/assets/js/ng-infinite-scroll.min.js', 
      'dev/app/app.js',
      'dev/app/config.js',
      'dev/app/directives.js',
      'dev/app/controllers.js'
      ])
    .pipe(plumber())
    // .pipe(babel({
    //   presets: ['es2015']
    // }))
    .pipe(jsConcat('main.js'))
    .pipe(rename({
      extname: '.js'
    }))
    // .pipe(minifyJs({
    //   ext:{
    //     min:'.js'
    //   }
    // }))
    .pipe(gulp.dest('public/assets/js'))
    .pipe(browsersync.reload({stream: true}));
  })
});

/**
 * Gulp Nodemon
 */
gulp.task('nodemon', function(cb) {
    var started = false;

    return nodemon({
        script: 'server.js',
        ignore: [
          'gulpfile.babel.js',
          'node_modules/',
          'bower_components/',
          'public/**/*.js'
        ],
        ext: 'js ejs',
        env: {
          'NODE_ENV': 'development',
          'DEBUG': 'appname:*'
        }
    }).on('start', function() {
        if (!started) {
            cb();
            started = true;
        }
    }).on("restart", function () {
      setTimeout(function () {
        browsersync.reload();
      }, 1000);
    });
});


/**
 * Browser-Sync Task
 */
gulp.task('browser-sync',['nodemon'], () => {
  browsersync.init(null, {
      proxy: 'http://localhost:3000',
      port: "3333"
  });
});

gulp.task('default', ["html", "sass", "styles", "scripts", "transferFonts", "fonts", "images", "browser-sync"]);