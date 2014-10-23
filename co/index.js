var thunk	= require('thunkify')
	,co		= require('co')
	,fs		= require('fs')
	,read	= thunk(fs.readFile);

//function* sizeGen(files1, files2){
//	
//	var a = read(files1);
//	var a = read(files2);
//	
//	return [
//		 (yield a).length
//		,(yield b).length
//	];
//};
//
//var size = co(sizeGen);

//exports.sizeOf = function(file1, file2){
//	size(file1, file2, function(err, res){
//		if(err) return console.error(err);
//		console.log(res);
//	});
//};

function sleep(ms){
	return function(fn){
		setTimeout(fn, ms);
	};
};

co(function* (){
	for(var i=0; i<5; i++){
		console.log(i);
		yield sleep(1000);
	}
}());