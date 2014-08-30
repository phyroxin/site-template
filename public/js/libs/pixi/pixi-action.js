(function($, pixi, win){
	
	/*======================================================================
	 * Config
	 *======================================================================
	 */
	//create stage and add colour
	var  interactive 			 = true
		,imgDIR 				 = '../../../images/'
		,stage 					 = new pixi.Stage(0xcccccc, interactive)
		,bunnyTexture			 = pixi.Texture.fromImage(imgDIR+"bunny.png")
		,redTexture				 = pixi.Texture.fromImage(imgDIR+"astroboy.fw-small.fw.png")
		,backgroundTexture  	 = pixi.Texture.fromImage(imgDIR+"pixel_landscape.jpg")
		,canvas					 = '#pixi-wrap > canvas'
		,direction 				 = 'right'
		,count = widthAdjust = n = 0
		,bunnyCount   			 = 1
		,globalDelay	  		 = 20
		,padding				 = 20
		,bunnyMax	  			 = 1
		,heightAdjust			 = 300
		,globalDuration	  		 = 1000
		,redArray   			 = []
		,bunnyArray   			 = [];
		
	var config = {
		 windowWidth  : (win.innerWidth || win.documentElement.clientWidth || win.body.clientWidth) - widthAdjust
		,windowHeight : (win.innerHeight || win.documentElement.clientHeight || win.body.clientHeight) - heightAdjust
		,canJump : true
	};
		
	// You can use either WebGLRenderer or CanvasRenderer
	// I had to use autodetect due to undefined glitch in WebGLRenderer renderer
	var renderer = pixi.autoDetectRenderer(config.windowWidth, config.windowHeight, null, true);
	document.getElementById("pixi-wrap").appendChild(renderer.view);
	
	
	/*======================================================================
	 * Animation core
	 *======================================================================
	 */
	function animate(opts, cb){
		var start = new Date;
		var id = setInterval(function(){
		
			var timePassed  = new Date - start;
			var progress	= timePassed / opts.duration
			
			if(progress > 1)
				progress = 1;

			var delta = opts.delta(progress);
			opts.step(delta, opts.elem);
			
			if(progress == 1){
				clearInterval(id);
				renderer.render(stage);
				if(typeof cb !== 'undefined')
					cb();
			}
			
			renderer.render(stage);
				
		}, globalDelay);
	}
	
	/*======================================================================
	 * Tween algo's
	 *======================================================================
	 */
	function randomScale(start, end){
		return Math.floor(Math.random() * end) + start;
	}
	
	function linear(progress){
		return progress;
	};
	
	function quad(progress){
		return Math.pow(progress, 2);
	};
	
	function circ(progress){
		return 1 - Math.sin(Math.acos(progress));
	};
	
	function back(progress){
		var x = 1.5;
		return Math.pow(progress, 2) * ((x + 1) * progress - x);
	};
	
	function bounce(progress){
		for(var a = 0, b = 1, result; 1; a += b, b /= 2)
			if(progress >= (7 - 4 * a) /11)
				return - Math.pow((11 - 6 * a -11 * progress) /4, 2) + Math.pow(b, 2);
	};
	
	function elastic(progress){
		var x = 2;
		return Math.pow(2, 10 * (progress -1)) * Math.cos(20 * Math.PI * x /3 * progress);
	};
	
	function makeEaseOut(delta){
		return function(progress){
			return 1 - delta(1 - progress);
		}
	};
	
	var quadEaseOut		= makeEaseOut(quad);
	var bounceEaseOut	= makeEaseOut(bounce);
	var elasticEaseOut	= makeEaseOut(elastic);
	
	
	/*======================================================================
	 * Draw sprites
	 *======================================================================
	 */
	function init(duration){
		
		if(n >= bunnyMax)
			return;
		
		if(Boolean($('#appHeaderText').find('span').length) === false){
			$('#appHeaderText')
				.append($('<span />', {
					 'id': 'bunnyCount'
				})
					.html(n+' Bunnies!'));
		}
		else{
			$('#bunnyCount')
				.html(n+' Bunnies!');
		}
		
		for(i=0; i<bunnyCount; i=i+1, n=n+1){
		
			var  randChoice = randomScale(1, 100)
				,redsHere   = false;
			
			if(randChoice %27 === 0){
				bunnyArray[n] = new pixi.Sprite(redTexture);
				redsHere = true;
			}
			else{
				bunnyArray[n] = new pixi.Sprite(bunnyTexture);
				redsHere = false;
			}
				
			bunnyArray[n].position.x    = randomScale(10, config['windowWidth']);
			bunnyArray[n].position.y    = -20;
			bunnyArray[n].width			= (redsHere)?20:27;
			bunnyArray[n].height 	    = (redsHere)?25:53;
			bunnyArray[n].pivot.x 	    = (bunnyArray[n].width /2);
			bunnyArray[n].pivot.y 	    = (bunnyArray[n].height /((redsHere)?2:randomScale(2,4)));
			bunnyArray[n].scale.x 	    = 1;
			bunnyArray[n].scale.y 	    = 1;
			bunnyArray[n].buttonMode    = true;
			bunnyArray[n].alpha		    = 1;
			bunnyArray[n].defaultCursor = 'pointer';
			bunnyArray[n].setInteractive(true);
			bunnyArray[n].canJump		= true;
			bunnyArray[n].canMove		= true;

			bunnyArray[n].mouseover = function(){
				bunnyJump(this, 300);
			};

			if(redsHere){
				redArray.push(bunnyArray[n]);
				bunnyArray.slice(n);
			}
			
			stage.addChild(bunnyArray[n]);

			(function(ele){
				var to = config['windowHeight'] - (ele.pivot.y +50);
				animate({
					 delay		: globalDelay
					,duration	: globalDuration
					,direction	: direction
					,delta		: bounceEaseOut
					,elem		: ele
					,step: function(delta, elem){
						elem.position.y = to*delta;
					}
				});
			}(bunnyArray[n]));
		}
		
		sortSprites();
	};
	
	function sortSprites(){
			
		var  arrayBackRow	  = []
			,arrayMidBackRow  = []
			,arrayMidFrontRow = []
			,arrayFrontRow	  = []
			,newBunnyArr	  = [];
		
		$.each(bunnyArray, function(){
			
			stage.removeChild(this);
			if(this.pivot.y === 26.5)
				arrayBackRow.push(this);
			else if(this.pivot.y === 17.666666666666668)
				arrayMidBackRow.push(this);
			else if(this.pivot.y === 13.25)
				arrayMidFrontRow.push(this);
			else if(this.pivot.y === 10.6)
				arrayFrontRow.push(this);
		});
		
		newBunnyArr.push(arrayBackRow);
		newBunnyArr.push(arrayMidBackRow);
		newBunnyArr.push(arrayMidFrontRow);
		newBunnyArr.push(arrayFrontRow);
			
		$.each(newBunnyArr, function(){
			$.each(this, function(){
				stage.addChild(this);
			});
		});
		
		$.each(redArray, function(key, item){	
			stage.addChildAt(this, stage.children.length - 1);
		});
	}
	
	function drawBackground(){
		backTexture = new pixi.Sprite(backgroundTexture);
		backTexture.position.x  = 0;
		backTexture.position.y  = 0;
		backTexture.scale.y		= 0.5;
		backTexture.scale.y		= 0.5;
		
		stage.addChild(backTexture);
		renderer.render(stage);
	}
	
	/*======================================================================
	 * Sprite actions
	 *======================================================================
	 */
	function bunnyDrop(element, duration){
		
		if(typeof element === 'undefined')
			return;
		
		var to	 = config['windowHeight'] - ((element.pivot.y +50)+element.position.y);
		var from = element.position.y;
		
		animate({
			 delay: globalDelay
			,duration: duration || globalDuration
			,delta: bounceEaseOut
			,elem: element
			,step: function(delta, elem){
				elem.position.y = from+(to*delta);
			}
		}, function(){ element.canJump = true; });
	}
	
	function bunnyJump(element, duration){
		
		if(typeof element === 'undefined')
			return;
			
		element.canJump = false;
		var to	 = randomScale(100, 300);
		var from = element.position.y;
			
		animate({
			 delay: globalDelay
			,duration: duration || globalDuration
			,delta: quadEaseOut
			,elem: element
			,step: function(delta, elem){
				elem.position.y = from-(to*delta);
			}
		}, function(){ bunnyDrop(element, 500) });
	}
	
	function bunnyMove(element, duration, to){
		
		var moveNormal, to, from;
			
		element.canMove = false;
		
		if(to === 'left')
			to	 = (element.position.x -10); //|| randomScale(50, 500);
		else
			to	 = (element.position.x +10); //|| randomScale(50, 500);
		
		from = element.position.x;
		
		console.log('=====================================================>>>');
		console.log(element.position.x);
		
		animate({
			 delay: globalDelay
			,duration: duration || globalDuration
			,delta: quadEaseOut
			,elem: element
			,step: function(delta, elem){
				console.log('from ' + elem.position.x);
				console.log('to ' + to);
				console.log('by ' + delta);
				console.log('inc ' + (to*delta));
				//elem.position.x = 
				//if(from > to)
				//	bunnyArray[0].position.x = (bunnyArray[0].position.x - 3)*delta; //(elem.position.x - (to*delta));
				//else if(from < to)
				//	bunnyArray[0].position.x = (bunnyArray[0].position.x + 3)*delta; //(elem.position.x + (to*delta));
			}
		}, function(){ element.canMove = true; });
	}
	
	/*======================================================================
	 * Spawn action
	 *======================================================================
	 */
	// random move
	(function(move){
		var randomMove = setInterval(function(){
			var randInt	  = randomScale(1, 100);
			var randBunny = randomScale(1, n);
			//if(randInt %2 === 0)
				if(typeof bunnyArray[randBunny] !== 'undefined' && bunnyArray[randBunny].canMove === true)
					move(bunnyArray[randBunny], 500);
			
		}, 5);
	}(bunnyMove));
	
	// random jump
	(function(jump){
		var randomJump = setInterval(function(){
			var randInt	  = randomScale(1, 100);
			var randBunny = randomScale(1, n);
			//if(randInt %15 === 0)
				if(typeof bunnyArray[randBunny] !== 'undefined' && bunnyArray[randBunny].canJump === true)
					jump(bunnyArray[randBunny], 300);
			
		}, 10);
	}(bunnyJump));
	
	// random spawn
	(function(drawBg){
		drawBg();
		var randomSpawn = setInterval(function(){
			var randInt = randomScale(1, 100);
			if(randInt %10 === 0)
				init();
		}, 100);
	}(drawBackground));
	
	// render loop
	(function(){
		var renderLoop = setInterval(function(){
			renderer.render(stage);
		}, globalDelay);
	}());
	
	/*======================================================================
	 * Event bindings
	 *======================================================================
	 */
	$(win)
		.resize(function(){
		
			config['windowWidth']  = (win.innerWidth || win.documentElement.clientWidth || win.body.clientWidth) - widthAdjust;
			config['windowHeight'] = (win.innerHeight || win.documentElement.clientHeight || win.body.clientHeight) - heightAdjust;
			
			$(canvas)
				.attr('width',  config['windowWidth'])
				.attr('height', config['windowHeight']);
		})
		.on('click', canvas, function(){
			var whichBunny = randomScale(1, n);
			if(typeof bunnyArray[whichBunny] !== 'undefined' && bunnyArray[whichBunny].canJump === true)
				bunnyJump(bunnyArray[whichBunny], 300);
		})
		.on('keydown',function(event) {
			if(event.keyCode == 37) {
				bunnyArray[0].position; 
				if(bunnyArray[0].position.x > 10)
					bunnyMove(bunnyArray[0], globalDuration, 'left');
			}
			else if(event.keyCode == 39) {
				if(bunnyArray[0].position.x < (config['windowWidth']-10))
					bunnyMove(bunnyArray[0], globalDuration, 'right');
			}
			else if(event.keyCode == 38) {
				bunnyJump(bunnyArray[0], 300);
			}
		});

}(jQuery, PIXI || {}, window || document));