/*===============================================================================================
 * Models
 *======================================================================
 */
 
// Comment Mode
var CommentModel = Backbone.Model.extend({
	
	initialize: function() {
		this.on('change', function(){ commentView.render() });
	}
	
	,defaults: {
		 "text": "Unknown Text"
		,"timestamp": "Unknown timestamp"
	}
});

var commentModel = new CommentModel();

/*===============================================================================================
 * Collections
 *======================================================================
 */

// Comment Collection
var CommentCollection = Backbone.Collection.extend({
	
	model: CommentModel,
	
	url: '/api/getData',
	
	initialize: function(){
		this.on('change', function(){ commentListView.render(); });
		console.log('running init function for ArtifactCollection');
		this.fetch({async:false});
	},
	
	parse: function(data) {
		console.log('running parse');
		return _.map(data, _.identity);
	},
	
	reset: function(models, options) {
		if(options && options.parse) {
			delete options.parse;
			models = this.parse(models);
		}
		return Backbone.Collection.prototype.reset.call(this, models, options);
	}
});

var commentCollection = new CommentCollection();

/*======================================================================
 * Workspace
 *======================================================================
 */
Workspace = Backbone.Router.extend({
		
	routes:{
		 ""		 : "home"
		,"home"	 : "home"
	}
	
	,initialize: function(){}
	
	,home : function(){
		console.log('home');
		APP.prototype.GET_WEATHER(function(data){
			weatherHomeView = new WeatherHomeView();
			weatherHomeView.render(data);
			
		});
		APP.prototype.GET_FOOTBALL(function(data){
			footballHomeView = new FootballHomeView();
			footballHomeView.render(data);
			
		});
	}
	
	,admin : function(){
		console.log('home');
	}
});


/*===============================================================================================
 * Header View
 *======================================================================
 */
var WeatherHomeView = Backbone.View.extend({

	 el: '#appWeather'
	 
	,initialize : function(){
		_.bindAll(this.inputFunc, 'onSignOut', 'onSignIn');
	}
	
	,inputFunc : {
		 value : 'value'
		,sgnBtn : '#sign-state'
		,onSignIn : function(e){
			e.preventDefault();
			console.log('sign in');
		}
		,onSignOut  : function(e){
			e.preventDefault();
			console.log('sign out');
		}
	}
	
	,render: function(obj){
		var  el		= this.$el;
		
		weatherHeaderView = new WeatherHeaderView();
		weatherHeaderView.render(obj);
		
		weatherContentView = new WeatherContentView();
		weatherContentView.render(obj);
		
		return this;
	}
});

/*======================================================================
 * Weather header View
 *======================================================================
 */
var WeatherHeaderView = Backbone.View.extend({

	 el: '#appWeatherHeader'
	 
	,initialize : function(){
		_.bindAll(this.inputFunc, 'onLocWeather');
	}
	
	,inputFunc : {
		onLocBtn: '#area'
		,onLocWeather: function(loc){
			APP.prototype.GET_WEATHER(loc, function(data){
				weatherContentView = new WeatherContentView();
				weatherContentView.render(data);
			});
		}
	}
	
	,render: function(obj){
		var el = this.$el;
		
		jade.render(el[0]
			,'temp-weather-header'
			,{}
		);
		
		$(this.inputFunc.onLocBtn).bind('keyup', { 'inputFunc': this.inputFunc }, function(event){
			if(event.keyCode === 13){
				console.log($(this).val());
				event.data.inputFunc.onLocWeather($(this).val());
			}
		})
		
		return this;
	}
});

/*======================================================================
 * Weather content View
 *======================================================================
 */
var WeatherContentView = Backbone.View.extend({

	 el: '#appWeatherHeaderContent'
	 
	,initialize : function(){}
	
	,inputFunc : {}
	
	,render: function(obj){
		var el = this.$el;
		
		jade.render(el[0]
			,'temp-weather-content'
			,{
				 location: obj.data.request[0].query
				,temp: obj.data.weather[0].tempMaxC
				,observation_time: obj.data.current_condition[0].observation_time
				,cloudcover: obj.data.current_condition[0].cloudcover
				,humidity: obj.data.current_condition[0].humidity
				,pressure: obj.data.current_condition[0].pressure
				,windspeedKmph: obj.data.current_condition[0].windspeedKmph
				,winddir16Point: obj.data.current_condition[0].winddir16Point
			}
		);

		return this;
	}
});


/*===============================================================================================
 * Football View
 *======================================================================
 */
var FootballHomeView = Backbone.View.extend({

	 el: '#appFootball'
	 
	,initialize : function(){
		_.bindAll(this.inputFunc, 'onSignOut', 'onSignIn');
	}
	
	,inputFunc : {
		 value : 'value'
		,sgnBtn : '#sign-state'
		,onSignIn : function(e){
			e.preventDefault();
			console.log('sign in');
		}
		,onSignOut  : function(e){
			e.preventDefault();
			console.log('sign out');
		}
	}
	
	,render: function(obj){
		var  el		= this.$el;
		
		footballHeaderView = new FootballHeaderView();
		footballHeaderView.render(obj);
		
		footballContentView = new FootballContentView();
		footballContentView.render(obj);
		
		return this;
	}
});

/*======================================================================
 * Football header View
 *======================================================================
 */
var FootballHeaderView = Backbone.View.extend({

	 el: '#appFootballHeader'
	 
	,initialize : function(){
		_.bindAll(this.inputFunc, 'onLocWeather');
	}
	
	,inputFunc : {
		onLocBtn: '#competition'
		,onLocWeather: function(loc){
			APP.prototype.GET_FOOTBALL(loc, function(data){
				footballContentView = new FootballContentView();
				footballContentView.render(data);
			});
		}
	}
	
	,render: function(obj){
		var el = this.$el;
		
		jade.render(el[0]
			,'temp-football-header'
			,{
				season: obj.teams[0].stand_season
			}
		);
		
		$(this.inputFunc.onLocBtn).bind('keyup', { 'inputFunc': this.inputFunc }, function(event){
			if(event.keyCode === 13){
				console.log($(this).val());
				event.data.inputFunc.onLocWeather($(this).val());
			}
		})
		
		return this;
	}
});

/*======================================================================
 * Football content View
 *======================================================================
 */
var FootballContentView = Backbone.View.extend({

	 el: '#appFootballContent'
	 
	,initialize : function(){}
	
	,inputFunc : {}
	
	,render: function(obj){
		var el = this.$el;
		
		jade.render(el[0]
			,'temp-football-content'
			,{
				 teams: obj.teams
			}
		);

		return this;
	}
});
 
workspace = new Workspace();
Backbone.history.start();

























