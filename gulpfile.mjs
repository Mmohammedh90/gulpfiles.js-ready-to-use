// import gulp from the node_modules folder
import gulp from 'gulp';
import concat from 'gulp-concat';
import prefix from 'gulp-autoprefixer';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify';
import {deleteAsync} from 'del'; 
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);



// Tasks
export const html = () => gulp
  .src('src/*.html')
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream()); //event - page reload to the listener in the server

export const css = () => gulp
.src('src/css/main.scss')
.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
.pipe(concat('styles.css'))
.pipe(prefix('last 2 version'))
.pipe(gulp.dest('dist/css'))
.pipe(browserSync.stream());

export const js = () => gulp
  .src('src/js/scripts.js')
  .pipe(uglify())
  .pipe(concat('scripts.min.js'))
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());

export const copy = () => gulp
  .src([
    'src/fonts/**/*',
    'src/images/**/*'
  ], {
  base: 'src' //track file paths to add them as well
  })
  .pipe(gulp.dest('dist')) //put it in dev
  .pipe(browserSync.stream({
    once: true //run only once
  }));


//server init
export const server = () => {
    browserSync.init({
        ui: false,
        notify: false,
        // tunnel: true, //use if you need to show the site to someone.
        server: {
            baseDir: ['dist','dist/css'],
        }
    });
    gulp.watch('src/*.html', html);
    gulp.watch('src/**/*.scss', css);
    gulp.watch('src/**/*.js', js);
    gulp.watch(['./src/images/**/*', 'src/fonts/**/*'], copy);
}

//clears dist for dev and build
export const clear = (done) => {
    deleteAsync([path.dist.base], {
      force: true,
    });
    done();
  };
  

//Launch

// repeating basic operations
export const base = gulp.parallel(html, css, js, copy);

// build build
export const build = gulp.series(clear, base);

// Build dev
export default gulp.series(base, server);