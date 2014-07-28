$(document).ready(function(){

	$(document)
	.on('click', '#id', function(){
		alert(1);
	});
	
	workspace = new Workspace();
	Backbone.history.start();
	
	APP.prototype.GET_DATA(function(){
		console.log('data loaded');
	});
});