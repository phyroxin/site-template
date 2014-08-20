// TODO: create gulp watcher

var  gulp        = require('gulp')
    ,jshint      = require('gulp-jshint')
    ,streamify   = require('gulp-streamify')
    ,uglify      = require('gulp-uglify')
    ,concat      = require('gulp-concat')
    ,order       = require('gulp-order')
    ,changed    = require('gulp-changed')
    ,imagemin    = require('gulp-imagemin')
    ,pngcrush    = require('imagemin-pngcrush')
    ,browserify  = require('browserify')
    ,b			 = browserify({ debug:true })
    ,source      = require('vinyl-source-stream')
	,compileSrc	 = 'public/js/*.js'
	,compileDest = 'public/build'
	,libsSrc	 = 'public/js/libs/*.js'
	,libsDest	 = 'public/build/libs'
	,tempSrc	 = 'public/js/template/jade-templates.js'
	,tempDest	 = 'public/build/template'
	,pixiifySrc	 = ['./public/js/libs/pixi/pixi-main.js', './public/js/libs/pixi/pixi-action.js']
	,pixiifyDest = './public/build/'
	,imgSrc		 = 'public/images/*'
	,imgDest	 = 'public/build/images';

gulp.task('compile-app', function(){
	gulp.src(compileSrc)
	    .pipe(order([
			 "_globals.js"
			,"app.js"
			,"init.js"
	    ]))	
	    .pipe(jshint({laxcomma:true}))
	    .pipe(jshint.reporter('default'))
	    .pipe(uglify())
	    .pipe(concat('app.js'))
	    .pipe(gulp.dest(compileDest));
});

gulp.task('compile-libs', function(){
	gulp.src(libsSrc)
	    .pipe(order([
		 "underscore-min.js"
		,"json2-min.js"
		,"backbone-min.js"
		,"backbone.dispose.js"
	    ]))
	    .pipe(uglify())
	    .pipe(concat('libs.js'))
	    .pipe(gulp.dest(libsDest))
});

gulp.task('compile-temp', function(){
	gulp.src(tempSrc)
	    .pipe(uglify())
	    .pipe(concat('temp.js'))
	    .pipe(gulp.dest(tempDest))
});

gulp.task('pixiify', function(){
	return browserify(pixiifySrc)
		.bundle()
		.pipe(source('pixi.js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest(pixiifyDest));
});

gulp.task('compress-image', function(){
	
	gulp.src(imgSrc)
		.pipe(changed(imgDest))
		.pipe(imagemin({
			 progressive		: true
			,svgPlugins			: [
				 { removeViewBox			  : true }  // don't remove the viewbox attribute from the SVG
				,{ removeUselessStrokeAndFill : true }  // don't remove Useless Strokes and Fills
				,{ removeEmptyAttrs			  : true }	// don't remove Empty Attributes from the SVG
			]
			,optimizationLevel	: 7
			,interlaced 		: true
			,use				: [pngcrush({ reduce: true })]
		}))
		.pipe(gulp.dest(imgDest));
});

// automate tasks
gulp.task('default', ['compile-app', 'compile-libs', 'compile-temp', 'pixiify', 'compress-image'], function(){
	
	gulp.watch(compileSrc, ['compile-app']);
	
	gulp.watch(libsSrc, ['compile-libs']);
	
	gulp.watch(tempSrc, ['compile-temp']);
	
	gulp.watch(pixiifySrc, ['pixiify']);
	
	gulp.watch(imgSrc, ['compress-image']);
});






























