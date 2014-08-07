(function($, pixi, win){
	
	//create stage and add colour
	var  interactive 			= true
		,imgDIR 				= '../../../images/'
		,stage 					= new pixi.Stage(0xcccccc, interactive)
		,bunnyTexture			= pixi.Texture.fromImage(imgDIR+"bunny.png")
		,redTexture				= pixi.Texture.fromImage(imgDIR+"astroboy.fw-small.fw.png")
		,backgroundTexture  	= pixi.Texture.fromImage(imgDIR+"pixel_landscape.jpg")
		,canvas					= '#pixi-wrap > canvas'
		,count = widthAdjust = n = 0
		,direction 				= 'right'
		,padding				= 20
		,heightAdjust			= 300
		,bunnyArray   			= []
		,redArray   			= []
		,bunnyCount   			= 2
		,bunnyMax	  			= 500
		,globalDelay	  		= 10
		,globalDuration	  		= 1000;
		
	var config = {
		 windowWidth  : (win.innerWidth || win.documentElement.clientWidth || win.body.clientWidth) - widthAdjust
		,windowHeight : (win.innerHeight || win.documentElement.clientHeight || win.body.clientHeight) - heightAdjust
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
				if(typeof cb !== 'undefined')
					cb();
			}
				
		}, opts.delay || 20);
	}

	function checkPos(){
		if(bunny.position.y >= (config['windowHeight'] - (bunny.height/2)))
			direction = 'left';
		else if(bunny.position.x <= 0 + (bunny.width/2))
			direction = 'right';
			
		count = count +1;
	}

	function frameCount() {
		var text = count + ' fps'
		document.getElementById("pixi-text-wrap").innerHTML = text;
		count = 0;
	};

	function init(duration){
		
		if(n >= bunnyMax)
			return;
		
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
			
			bunnyArray[n].click = function(){
				console.log('clicked bunny');
			};
			
			bunnyArray[n].mouseover = function(){
				bunnyJump(this, 300);
			};

			stage.addChild(bunnyArray[n]);
				
			if(redsHere){
				redArray.push(bunnyArray[n]);
				bunnyArray.slice(n);
			}
			
			(function(ele){
				var to = config['windowHeight'] - (ele.pivot.y +50);
				animate({
					 delay: globalDelay
					,duration: globalDuration
					,direction: direction
					,delta: bounceEaseOut
					,elem: ele
					,step: function(delta, elem){
						elem.position.y = to*delta;
						renderer.render(stage);
					}
				});
			}(bunnyArray[n]));
		}
		
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
	};
	
	function drawBackground(){
		backTexture = new pixi.Sprite(backgroundTexture);
		backTexture.position.x  = 0;
		backTexture.position.y  = 0;
		backTexture.scale.y		= 0.5;
		backTexture.scale.y		= 0.5;
		
		stage.addChild(backTexture);
		renderer.render(stage);
	}
	
	function bunnyDrop(element, duration){
		
		if(typeof element === 'undefined')
			return;
			
		var to = config['windowHeight'] - (element.pivot.y +50);
		
		animate({
			 delay: globalDelay
			,duration: duration || globalDuration
			,delta: bounceEaseOut
			,elem: element
			,step: function(delta, elem){
				elem.position.y = to*delta;
				renderer.render(stage);
			}
		});
	}
	
	function bunnyJump(element, duration){
		
		if(typeof element === 'undefined')
			return;
			
		var to = 100;
			
		animate({
			 delay: globalDelay
			,duration: duration || globalDuration
			,delta: quadEaseOut
			,elem: element
			,step: function(delta, elem){
				elem.position.y -= (to*delta);
				renderer.render(stage);
			}
		}, function(){ bunnyDrop(element, 500) });
	}
	
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
	
	var quadEaseOut = makeEaseOut(quad);
	
	var bounceEaseOut = makeEaseOut(bounce);
	
	var elasticEaseOut = makeEaseOut(elastic);

	$(win).resize(function(){

		config['windowWidth']  = (win.innerWidth || win.documentElement.clientWidth || win.body.clientWidth) - widthAdjust;
		config['windowHeight'] = (win.innerHeight || win.documentElement.clientHeight || win.body.clientHeight) - heightAdjust;
		
		$(canvas)
			.attr('width',  config['windowWidth'])
			.attr('height', config['windowHeight']);
	});
	
	drawBackground();
	
	$(document)
		.on('click', canvas, function(){
			console.log('canvas clicked');
			bunnyJump(bunnyArray[randomScale(1, n)], 2000);
		});
	
	(function(){
		var randomSpawn = setInterval(function(){
			var randInt = randomScale(1, 100);
			if(randInt %10 === 0)
				init();
			if(randInt %5 === 0)
				bunnyJump(bunnyArray[randomScale(1, n)], 500);
			
		}, 1*100);
	}());

}(jQuery, PIXI || {}, window || document));