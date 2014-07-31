(function($, pixi, win){

	//create stage and add colour
	var  stage 					= new pixi.Stage(0xcccccc)
		,canvas					= '#pixi-wrap > canvas'
		,imgDIR 				= '../../../images/'
		,count 					= 0
		,direction 				= 'right'
		,padding				= 20
		,heightAdjust			= 300
		,widthAdjust			= 0;
		
	var config = {
		 windowWidth  : (win.innerWidth || win.documentElement.clientWidth || win.body.clientWidth) - widthAdjust
		,windowHeight : (win.innerHeight || win.documentElement.clientHeight || win.body.clientHeight) - heightAdjust
	};
		
	// You can use either WebGLRenderer or CanvasRenderer
	// I had to use autodetect due to undefined glitch in WebGLRenderer renderer
	var renderer = pixi.autoDetectRenderer(config.windowWidth, config.windowHeight, null, true);
	document.getElementById("pixi-wrap").appendChild(renderer.view);
	
	var bunnyTexture = pixi.Texture.fromImage(imgDIR+"bunny.png");
	var bunnyArray = [];
	var bunnyCount = 2;

	/*======================================================================
	 * Animation core
	 *======================================================================
	 */
	function animate(opts){
		var start = new Date;
		var id = setInterval(function(){
			var timePassed  = new Date - start;
			var progress	= timePassed / opts.duration
			
			if(progress > 1)
				progress = 1;
			
			var delta = opts.delta(progress);
			opts.step(delta, opts.elem);
			
			if(progress == 1)
				clearInterval(id);
				
		}, opts.delay || 10);
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
	
		for(i=0; i<bunnyCount; i=i+1){
		
			bunnyArray[i] = new pixi.Sprite(bunnyTexture);
			bunnyArray[i].position.x = randomScale(10, config['windowWidth']);
			bunnyArray[i].position.y = randomScale(10, 100);
			bunnyArray[i].width		 = 20; //randomScale(10, 50);
			bunnyArray[i].height 	 = 25; //randomScale(15, 55);
			bunnyArray[i].pivot.x 	 = (bunnyArray[i].width /2);
			bunnyArray[i].pivot.y 	 = (bunnyArray[i].height /2);
			bunnyArray[i].scale.x 	 = 1;//randomScale(1, 2);
			bunnyArray[i].scale.y 	 = 1;//randomScale(1, 5);
			
			stage.addChild(bunnyArray[i]);
			
			(function(ele){
				var to = config['windowHeight'] - (ele.pivot.y +20);
				animate({
					 delay: 2
					,duration: duration || 1000
					,direction: direction
					,delta: bounceEaseOut
					,elem: ele
					,step: function(delta, elem){
						console.log(elem);
						elem.position.y = to*delta;
						renderer.render(stage);
					}
				});
			}(bunnyArray[i]));
		}
	};
	
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
	
	var bounceEaseOut = makeEaseOut(bounce);
	
	var elasticEaseOut = makeEaseOut(elastic);

	$(win).resize(function(){

		config['windowWidth']  = (win.innerWidth || win.documentElement.clientWidth || win.body.clientWidth) - widthAdjust;
		config['windowHeight'] = (win.innerHeight || win.documentElement.clientHeight || win.body.clientHeight) - heightAdjust;
		
		$(canvas)
			.attr('width',  config['windowWidth'])
			.attr('height', config['windowHeight']);
	});
	
	$(document)
	.on('click', canvas, function(){
		console.log('click');
		init();
	});

}(jQuery, PIXI || {}, window || document));