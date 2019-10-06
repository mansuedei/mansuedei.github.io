const {src, dest, task, series, watch, parallel} = require('gulp');
const rm = require('gulp-rm');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const reload = browserSync.reload;
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const svgo = require('gulp-svgo');
const svgSprite = require('gulp-svg-sprite');
const gulpif = require('gulp-if');
const MobileDetect = require('mobile-detect');

const env = process.env.NODE_ENV;

sass.compiler = require('node-sass');

task('clean', () => {
	console.log(env);
	return src('dist/**/*.*', {read: false}).pipe(rm());
});

task('copy:html', () => {
	return src('src/*.html')
		.pipe(dest('dist'))
		.pipe(reload({stream: true}));
});

task('copy:img', () => {
	return src('src/img/**/*.{jpg,png}')
		.pipe(dest('dist/img'))
		.pipe(reload({stream: true}));
});

task('copy:vid', () => {
	return src('src/vid/**/*.*')
		.pipe(dest('dist/vid'))
		.pipe(reload({stream: true}));
});

const styles = [
	'node_modules/normalize.css/normalize.css',
	'src/css/main.scss',
];

task('styles', () => {
	return src(styles)
		.pipe(gulpif(env === 'dev', sourcemaps.init()))
		.pipe(concat('main.min.scss'))
		.pipe(sassGlob())
		.pipe(sass().on('error', sass.logError))
		.pipe(
			gulpif(
				env === 'dev',
				autoprefixer({
					overrideBrowserslist: ['last 2 versions'],
					cascade: false,
				})
			)
		)
		.pipe(gulpif(env === 'prod', gcmq()))
		.pipe(gulpif(env === 'prod', cleanCSS()))
		.pipe(gulpif(env === 'dev', sourcemaps.write()))
		.pipe(dest('dist'))
		.pipe(reload({stream: true}));
});

const libs = ['node_modules/jquery/dist/jquery.js', 'src/js/*.js'];

task('scripts', () => {
	return src(libs)
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.js', {newLine: ';'}))
		.pipe(
			gulpif(
				env === 'prod',
				babel({
					presets: ['@babel/env'],
				})
			)
		)
		.pipe(gulpif(env === 'prod', uglify()))
		.pipe(sourcemaps.write())
		.pipe(dest('dist'))
		.pipe(reload({stream: true}));
});

task('icons', () => {
	return (
		src('src/img/sprite/*.svg')
			// .pipe(
			// 	svgo({
			// 		plugins: [
			// 			{
			// 				removeAttr: {
			// 					attrs: '(fill|stroke|style|width|height|data.*)',
			// 				},
			// 			},
			// 		],
			// 	})
			// )
			.pipe(dest('dist/img/sprite'))
	);
});

task('server', () => {
	browserSync.init({
		server: {
			baseDir: './dist',
		},
		open: false,
	});
});

task('watch', () => {
	watch('./src/css/**/*.scss', series('styles'));
	watch('./src/*.html', series('copy:html'));
	watch('./src/js/*.js', series('scripts'));
});

task(
	'default',
	series(
		'clean',
		parallel('copy:html', 'copy:img', 'copy:vid', 'styles', 'scripts', 'icons'),
		parallel('watch', 'server')
	)
);

task(
	'build',
	series(
		'clean',
		parallel('copy:html', 'copy:img', 'copy:vid', 'styles', 'scripts', 'icons')
	)
);
