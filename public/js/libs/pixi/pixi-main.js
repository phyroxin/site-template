// Require pixi module
//var  pixi = require('pixi')
PIXI = (function(){
	var  Sprite					= require('pixi/display/Sprite')
		,Stage					= require('pixi/display/Stage')
		,Texture				= require('pixi/textures/Texture')
		,autoDetectRenderer 	= require('pixi/utils/autoDetectRenderer')
		,requestAnimationFrame 	= require('pixi/utils/raf');
		
	var PIXI = {
		 Sprite	:Sprite
		,Stage	:Stage
		,Texture:Texture
		,autoDetectRenderer		:autoDetectRenderer
		,requestAnimationFrame	:requestAnimationFrame
	};
	return PIXI;
}());