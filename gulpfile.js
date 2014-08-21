// require modules
var  gulp        = require('gulp')
	,fs     	 = require('fs')
	,coffee      = require('gulp-coffee')
    ,coffeelint  = require('gulp-coffeelint') 
	,header		 = require('gulp-header') 
    ,jshint      = require('gulp-jshint')
    ,streamify   = require('gulp-streamify')
    ,uglify      = require('gulp-uglify')
    ,concat      = require('gulp-concat')
    ,order       = require('gulp-order')
    ,changed     = require('gulp-changed')
    ,imagemin    = require('gulp-imagemin')
    ,pngcrush    = require('imagemin-pngcrush')
    ,browserify  = require('browserify')
    ,b			 = browserify({ debug:true })
    ,source      = require('vinyl-source-stream');

// paths to source files
var paths = {
	 compileSrc	 : 'public/js/*.js'
	,compileDest : 'public/build'
	,libsSrc	 : 'public/js/libs/*.js'
	,libsDest	 : 'public/build/libs'
	,tempSrc	 : 'public/js/template/jade-templates.js'
	,tempDest	 : 'public/build/template'
	,pixiifySrc	 : ['./public/js/libs/pixi/pixi-main.js', './public/js/libs/pixi/pixi-action.js']
	,pixiifyDest : './public/build/'
	,coffeeSrc   : 'public/coffee/*.coffee'
	,coffeeDest  : 'public/build/coffeeToJs'
	,imgSrc		 : 'public/images/*'
	,imgDest	 : 'public/build/images'
};
	
//var getVersion = function(){
//	return fs.readFileSync('Version');
//};
//
//var getCopyright = function(){
//	return fs.readFileSync('Copyright');
//};

gulp.task('compile-app', function(){
	gulp.src(paths.compileSrc)
		.pipe(changed(paths.compileDest))
	    .pipe(order([
			 "_globals.js"
			,"app.js"
			,"init.js"
	    ]))	
	    .pipe(jshint({laxcomma:true}))
	    .pipe(jshint.reporter('default'))
	    .pipe(uglify())
	    .pipe(concat('app.js'))
	    .pipe(gulp.dest(paths.compileDest));
});

gulp.task('compile-libs', function(){
	gulp.src(paths.libsSrc)
		.pipe(changed(paths.libsDest))
	    .pipe(order([
		 "underscore-min.js"
		,"json2-min.js"
		,"backbone-min.js"
		,"backbone.dispose.js"
	    ]))
	    .pipe(uglify())
	    .pipe(concat('libs.js'))
	    .pipe(gulp.dest(paths.libsDest))
});

gulp.task('compile-temp', function(){
	gulp.src(paths.tempSrc)
		.pipe(changed(paths.tempDest))
	    .pipe(uglify())
	    .pipe(concat('temp.js'))
	    .pipe(gulp.dest(paths.tempDest))
});

gulp.task('pixiify', function(){
	return browserify(paths.pixiifySrc)
		.bundle()
		.pipe(source('pixi.js'))
		.pipe(streamify(uglify()))
		.pipe(gulp.dest(paths.pixiifyDest));
});

gulp.task('compress-image', function(){
	
	gulp.src(paths.imgSrc)
		.pipe(changed(paths.imgDest))
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
		.pipe(gulp.dest(paths.imgDest));
});

gulp.task('coffee-compile', function(){
	gulp.src(paths.coffeeSrc)
		.pipe(changed(paths.coffeeDest))
	    .pipe(coffeelint('coffeelint.json'))
	    .pipe(coffeelint.reporter('default'))
	    .pipe(concat('coffeeCompiled.js'))
	    .pipe(coffee())
	    //.pipe(uglify())
	    //.pipe(header(getCopyright(), { version: getVersion() }))
	    .pipe(gulp.dest(paths.coffeeDest))
});

// automate tasks and create watchers
gulp.task(
	 'default'
	,[	
	 	 'compile-app'
		,'compile-libs'
		,'compile-temp'
		,'pixiify'
		,'compress-image'
		,'coffee-compile'
	]
	
	,function(){
		gulp.watch(paths.compileSrc, ['compile-app']);
		gulp.watch(paths.libsSrc, ['compile-libs']);
		gulp.watch(paths.tempSrc, ['compile-temp']);
		gulp.watch(paths.pixiifySrc, ['pixiify']);
		gulp.watch(paths.imgSrc, ['compress-image']);
		gulp.watch(paths.coffeeSrc, ['coffee-compile']);
	}
);