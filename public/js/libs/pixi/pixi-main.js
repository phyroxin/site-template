// Require pixi module
//var  pixi = require('pixi')
var  Sprite					= require('pixi/display/Sprite')
	,Stage					= require('pixi/display/Stage')
	,Texture				= require('pixi/textures/Texture')
	,autoDetectRenderer 	= require('pixi/utils/autoDetectRenderer')
	,requestAnimationFrame 	= require('pixi/utils/raf')
	,imgDIR 				= '../../../images/'
	,count 					= 0
	,direction 				= 'right';
//create stage and add colour
var stage = new Stage(0xcccccc);
// You can use either WebGLRenderer or CanvasRenderer
// I had to use autodetect due to undefined glitch in WebGLRenderer renderer
var renderer = autoDetectRenderer(400, 300);
//var renderer =CanvasRenderer(800, 600);
document.getElementById("pixi-wrap").appendChild(renderer.view);

var bunnyTexture = Texture.fromImage(imgDIR+"bunny.png");
var bunny = new Sprite(bunnyTexture);

bunny.position.x = 200;
bunny.position.y = 150;
bunny.width = 20;
bunny.height = 25;
bunny.pivot.x = 10;
bunny.pivot.y = 10;
bunny.scale.x = 2;
bunny.scale.y = 2;

stage.addChild(bunny);

function animate() {

	if(direction === 'right')
		bunny.position.x += 3;
	else if(direction === 'left')
		bunny.position.x -= 3;
		
    renderer.render(stage);
	checkPos();
	count = count +1;
};

function checkPos(){
	 //bunny.rotation += 0.01;
	if(bunny.position.x >= (400 - (bunny.width/2)))
		direction = 'left';
	else if(bunny.position.x <= 0 + (bunny.width/2))
		direction = 'right';
}

function frameCount() {
	var text = count + ' fps'
	document.getElementById("pixi-text-wrap").innerHTML = text;
	count = 0;
};

function init(){
	setInterval(function(){ requestAnimationFrame(animate); }, 1*10);
	setInterval(function(){ frameCount(); }, 1*1000);
};

init();