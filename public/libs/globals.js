(function($){

	$(document)
	.on('click', '#holeImg', function(){
	
		$('.one-img-style').css({ 
			 'opacity'	   : '1' 
			,'margin-top'  : '-40px'
			,'margin-left' : '20px'
		});
		
		setTimeout(function(){ $('.zero-img-style').css({ 
			 'opacity'	   :'1' 
			,'margin-top'  : '-10px'
			,'margin-left' : '-10px'
		}); }, 300);
	});

	/*========================================================
	 * Global App name-space
	 *========================================================
	 */
	APP = (function($){

		/*========================================================
		 * Define app globals
		 *========================================================
		 */
		var  _config = {
			//url : '//'+window.location.hostname+':8080/' // local
			url : '//'+window.location.hostname+'/' // public
		}
		
		/*========================================================
		 * free function arguments for garbage collection
		 *========================================================
		 */
		var freeMem = function(args){
			for(var i=0; i<args.length; i=i+1){
				args[i] = null;
			}
			return args;
		};
		
		/*========================================================
		 * localize ajax calls
		 *========================================================
		 */
		var ajaxFunc = function(uri, method, data, data_type, cb){
			console.log('Ajax call====================================>>');
			console.log(uri);
			$.ajax({
				 url	  : uri
				,type	  : method
				,data	  : (data)?data:{}
				,dataType : data_type
			})
			.done(function(o){
				console.log('result================>');
				console.log(o);
				cb(o);
				freeMem(arguments);
			});
		}
		
		/*========================================================
		 * extend jquery with loading function
		 *========================================================
		 */
		$.fn.extend({
			loading: function(){
				return this.addClass('csspinner duo');
			},
			loaded: function(){
				return this.removeClass('csspinner duo');
			}
		});
		
		/*======================================================================
		 * Assign methods to function
		 *======================================================================
		 */
		Function.prototype.method = function (name, func) {
			if (!this.prototype[name])
				this.prototype[name] = func;
			return this;
		};
		
		/*======================================================================
		 * deentitify
		 *======================================================================
		 */
		String.method('deentityify', function () {
			var entity = {
				"quot" : '"',
				"lt" : '<',
				"gt" : '>',
				"amp;rsquo" : '\'',
				"amp;amp;rsquo" : '\'',
				"amp;rdquo" : '"',
				"amp;amp;rdquo" : '"',
				"amp;lsquo" : '\'',
				"amp;amp;lsquo" : '\'',
				"amp;ldquo" : '"',
				"amp;amp;ldquo" : '"',
				"amp;pound" : '£'
			};
			return function () {
				return this.replace(/&([^&]+);/gm, function (a, b) {
					var r = entity[b];
					return typeof r === 'string' ? r : a;
				}).replace(/\\/gm, '');
			};
		}());
		
		/*========================================================
		 * Load individual shoe data in popup window
		 *========================================================
		 */
		var getUrl = function(){
			return _config.url
		}
		
		/*========================================================
		 * Load user data
		 *========================================================
		 */
		var getData = function(cb){
			
			//$('div').loading();
			
			var data = { 'id':'test' } || {};
			
			ajaxFunc(
				 APP.prototype.GET_URL()+'api/getData'
				,'GET'
				,data
				,'json'
				,function(o){
					cb(o);
					//$('div').loaded();
				}
			);
		}
		
		/*========================================================
		 * Load weather data
		 *========================================================
		 */
		var getWeather = function(loc, cb){
			
			$('#appWeatherHeaderContent').loading();
			
			var cb	 = (loc instanceof Function)?loc:cb;
			var data = (loc instanceof Function)?{}:loc;
			
			ajaxFunc(
				 APP.prototype.GET_URL()+'api/getWeatherApi'
				,'GET'
				,{ data:data }
				,'json'
				,function(o){
					cb(o);
					$('#appWeatherHeaderContent').loaded();
				}
			);
		}
		
		/*========================================================
		 * Load footbal data
		 *========================================================
		 */
		var getFootball = function(cb){
			
			$('#appFootballContent').loading();
			
			ajaxFunc(
				 APP.prototype.GET_URL()+'api/getFootballApi'
				,'GET'
				,{}
				,'json'
				,function(o){
					cb(o);
					$('#appFootballContent').loaded();
				}
			);
		}
		
		/*========================================================
		 * Build module for external use
		 *========================================================
		 */
		function APP(){};
		
		APP.prototype.GET_DATA		= getData;
		APP.prototype.GET_WEATHER	= getWeather;
		APP.prototype.GET_FOOTBALL	= getFootball;
		APP.prototype.GET_URL		= getUrl;
		APP.prototype.GET_URL		= getUrl;
		
		return APP;
	}(jQuery));

	/*======================================================================
	 * start socket transactions
	 *======================================================================
	 */
	var socket;

	(function(APP){
		
		socket = io.connect('ws://pubquizv2-nodebackbone.rhcloud.com:8000/'); // public
		//socket = io.connect(APP.prototype.GET_URL()); // local

		/*======================================================================
		 * display latency
		 *======================================================================
		var latencyTest = setInterval(function(){
			startTime = Date.now();
			socket.emit('ping');
		}, 2000);
		
		socket.on('pong', function(){
			latency = Date.now() - startTime;
			console.log('Sever latency: '+latency+'ms');
		});
		 */ 
		
		socket.on('socket start', function(user){
		
			console.log('Hello socket...');
			
			/*
			(function(userScoreId){
				socket.on(userScoreId, function(data){
					$('.results').css({'display': 'block'});
					resultView = new ResultView();
					resultView.render(data);
				});
			}(userScoreId));*/
			
		});
		
		socket.on('update stats', function(data){
			console.log('Data received');
			weatherContentView = new WeatherContentView();
			weatherContentView.render(data);
		});
	}(APP));

}(jQuery));