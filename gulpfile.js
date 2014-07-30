// create gulp watcher

var  gulp       = require('gulp')
    ,jshint     = require('gulp-jshint')
    ,uglify     = require('gulp-uglify')
    ,concat     = require('gulp-concat')
    ,order      = require('gulp-order')
    ,browserify = require('browserify')
    ,b			= browserify({ debug:true })
    ,source     = require('vinyl-source-stream');

gulp.task('compile-app', function(){
	gulp.src('public/js/*.js')
	    .pipe(order([
		 "_globals.js"
		,"app.js"
		,"init.js"
		,"*.js"
	    ]))	
	    .pipe(jshint({laxcomma:true}))
	    .pipe(jshint.reporter('default'))
	    .pipe(uglify())
	    .pipe(concat('app.js'))
	    .pipe(gulp.dest('public/build'));
});

gulp.task('compile-libs', function(){
	gulp.src('public/js/libs/*.js')
	    .pipe(order([
		 "underscore-min.js"
		,"json2-min.js"
		,"backbone-min.js"
		,"backbone.dispose.js"
	    ]))
	    .pipe(uglify())
	    .pipe(concat('libs.js'))
	    .pipe(gulp.dest('public/build/libs'))
});

gulp.task('compile-temp', function(){
	gulp.src('public/js/template/jade-templates.js')
	    .pipe(uglify())
	    .pipe(concat('temp.js'))
	    .pipe(gulp.dest('public/build/template'))
});

gulp.task('browsy', function(){
	return b.add('./public/js/pixi/pixi-main.js')
		.bundle()
		.pipe(source('pixi.js'))
		.pipe(gulp.dest('./public/build/'));
});
