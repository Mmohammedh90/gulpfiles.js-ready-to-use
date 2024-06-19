// Gulp to node_modules
import gulp from 'gulp';
import concat from 'gulp-concat';
import prefix from 'gulp-autoprefixer';
import replace from 'gulp-replace';



// Tasks
export const css = () => gulp
.src('styles/main.scss')