const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

gulp.task('css', () =>
  return gulp.src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist'))
    .pipe(cssnano({
      autoprefixer: false
    }))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'));
);
