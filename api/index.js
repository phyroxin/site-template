/*========================================================
 * Include modules
 *========================================================
 */
var  G		    = require('../globals')
	,request    = require('request')
	,async		= require('async')
	,FreeApiKey = 'b3df23a258079d65ad307739f63b0b3d391e1e07';

// -------------------------------------------

exports.JSONP_WeatherApi = (function() {
	
	var requestModule = function(cb, type){
		
		var options = {
			url: 'http://api.worldweatheronline.com/free/v1/weather.ashx'
				+'?key='+FreeApiKey
				+'&q=' + G.GLOBALS.prototype.GET_LOC()
				+'&fx=yes'
				+'&cc=yes'
				+'&date=today'
				+'&num_of_days=5'
				+'&format=json'
			,headers: {}
		};
		
		request(options, function callback(error, response, body) {
			if (!error && response.statusCode == 200) {
				info = JSON.parse(body);
				cb(info);
			}
			else{
				console.log(error);
			}
		});
	};
	
	return {
		httpAction: function(req, res){
			
			if(typeof req.query.data !== 'undefined')
				G.GLOBALS.prototype.SET_LOC(req.query.data);
				
			requestModule(function(data){
				res.send(data);
			}, 1);
		}
		,socketAction: function(cb){
			async.waterfall([
					 function(callback){
						requestModule(function(data){
							callback(null, data);
						}, 1);
					}
				]
				,function(err, arg1){
					cb(arg1);
				}
			);
		}
	}
}());

exports.JSONP_TimeZone = function(req, res) {

	var options = {
		url: 'http://api.worldweatheronline.com/free/v1/tz.ashx?key='+FreeApiKey+'&q=Brighton&fx=no&format=json'
		,headers: {}
	}
	
	request(options, function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			res.send({ 'data':response });
		}
		else{
			console.log(error);
		}
	});
}

exports.JSONP_SearchLocation = function(req, res) {
    //var url = _FreeApiBaseURL + "search.ashx?q=" + input.query + "&format=" + input.format + "&timezone=" + input.timezone + "&popular=" + input.popular + "&num_of_results=" + input.num_of_results + "&key=" + _FreeApiKey;

	var options = {
		url: 'http://api.worldweatheronline.com/free/v1/weather.ashx?key='+FreeApiKey+'&q=Brighton&fx=no&format=json'
		,headers: {}
	}
	
	request(options, function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			res.send({ 'data':response });
		}
		else{
			console.log(error);
		}
	});
}

exports.JSONP_MarineWeather = function(req, res) {
   // var url = _FreeApiBaseURL + "marine.ashx?q=" + input.query + "&format=" + input.format + "&fx=" + input.fx + "&key=" + _FreeApiKey;

   var options = {
		url: 'http://api.worldweatheronline.com/free/v1/weather.ashx?key='+_FreeApiKey+'&q=Brighton&fx=no&format=json'
		,headers: {}
	}
	
	request(options, function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			res.send({ 'data':response });
		}
		else{
			console.log(error);
		}
	});
   
}
