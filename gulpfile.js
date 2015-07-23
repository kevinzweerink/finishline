var gulp = require('gulp'),
	include = require('gulp-file-include'),
	concat = require('gulp-concat'),
	compress = require('gulp-bookmarkify'),
	rename = require('gulp-rename'),
	strip = require('gulp-strip-code');

var paths = {
	templates : './templates/',
	root	  : './',
	src 	  : './src/',
	js		  : './src/js/'
}

var scripts = [
	paths.js + '_engine.js',
	paths.js + '_map.js',
	paths.js + '_main.js',
	paths.js + '_caboose.js'
]

gulp.task('compile', function() {
	console.log('Compiling...');
	return gulp.src( scripts )
		.pipe(concat('_bookmarklet.js'))
		.pipe(compress())
		.pipe( gulp.dest( paths.templates ) );
});

gulp.task('build', ['compile'],function() {
	console.log('Building...');
	return gulp.src( paths.templates + 'index.html' )
		.pipe(include())
		.pipe( gulp.dest( paths.root ) );
});

gulp.task('export', function() {
	console.log('Exporting Map');
	return gulp.src( paths.js + '_map.js' )
		.pipe( rename('map.json') )
		.pipe( strip({
			start_comment: 'js_only',
			end_comment: 'end_js_only'
		}) )
		.pipe( gulp.dest(paths.root) );
});

gulp.task('watch', function() {
	gulp.watch(scripts, ['compile', 'build', 'export']);
});

gulp.task('default', ['compile','build', 'export'], function() {
	console.log('Gulp Done');
});