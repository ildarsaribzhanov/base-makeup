'use strict';

let gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename'),
    imagemin   = require('gulp-imagemin'),
    plumber    = require('gulp-plumber'),
    babel      = require('gulp-babel'),
    notify     = require('gulp-notify');

const PATHS = {
	css  : {
		src: './css/**/*.scss',
		build : './css'
	},
	js: {
		src: './js/src/*.js',
		build : './js/build'
	},
	img: {
		src: './images/*',
		build : './images'
	}
};

// SCSS compiled
gulp.task('sass', function () {
	return gulp.src(PATHS.css.src)
	// отлов ошибок
		.pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))

		// Для генераии style.css.map
		.pipe(sourcemaps.init())

		// Собственно компиляция
		.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))

		// Куда положить .map
		.pipe(sourcemaps.write('./'))

		// Путь компиляции
		.pipe(gulp.dest(PATHS.css.build));
});

gulp.task('sass:watch', function () {
	gulp.watch(PATHS.src.css, ['sass']);
});

// image compress
gulp.task('compress-img', function () {
	gulp.src(PATHS.img.src)
		.pipe(imagemin())
		.pipe(gulp.dest(PATHS.img.build))
});


// JS COMPRESSED
gulp.task('compressed-js', function () {
	gulp.src(PATHS.js.src)
		.pipe(sourcemaps.init())

		// Собственно минификация
		.pipe(uglify())

		// Добавление префикса
		.pipe(rename({suffix: '.min'}))

		// map-файл положим в отдельную папку
		.pipe(sourcemaps.write('./'))

		// А результат сжатия тоже в свою папку
		.pipe(gulp.dest(PATHS.js.build));
});

gulp.task('compressed-js:watch', function () {
	gulp.watch(PATHS.js.src, ['compressed-js']);
});

// Смотрим на все
gulp.task('do-all', ['sass', 'compressed-js']);

// Смотрим на все
gulp.task('watch', ['sass:watch', 'compressed-js:watch']);