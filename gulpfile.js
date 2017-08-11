'use strict';

var gulp       = require('gulp'),
    sass       = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify     = require('gulp-uglify'),
    rename     = require('gulp-rename'),
    imagemin   = require('gulp-imagemin');

// SCSS compiled
gulp.task('sass', function () {
	return gulp.src('./css/**/*.scss')

	// Для генераии style.css.map
		.pipe(sourcemaps.init())

		// Собственно компиляция
		.pipe(sass({outputStyle: 'expanded', indentType: 'tab', indentWidth: 1}).on('error', sass.logError))

		// Куда положить .map
		.pipe(sourcemaps.write('./'))

		// Путь компиляции
		.pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
	gulp.watch('./css/**/*.scss', ['sass']);
});

// image compress
gulp.task('compress-img', function() {
	gulp.src('images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('images'))
});


// JS COMPRESSED
gulp.task('compressed-js', function () {
	gulp.src('js/src/*.js')
		.pipe(sourcemaps.init())

		// Собственно минификация
		.pipe(uglify())

		// Добавление префикса
		.pipe(rename({suffix: '.min'}))

		// map-файл положим в отдельную папку
		.pipe(sourcemaps.write('./maps'))

		// А результат сжатия тоже в свою папку
		.pipe(gulp.dest('js'));
});

gulp.task('compressed-js:watch', function () {
	gulp.watch('./js/src/*.js', ['compressed-js']);
});


// Смотрим на все
gulp.task('watch', ['sass:watch', 'compressed-js:watch']);