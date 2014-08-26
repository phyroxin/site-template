
/*===============================================================================================
  * Models
  *======================================================================
 */


/* Comment Mode */

(function() {
  var DefaultCollection, DefaultContentView, DefaultHeaderView, DefaultModel, DefaultView, Workspace,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DefaultModel = (function(_super) {
    __extends(DefaultModel, _super);

    function DefaultModel() {
      return DefaultModel.__super__.constructor.apply(this, arguments);
    }

    DefaultModel.prototype.initialize = function() {
      return this.on('change', function() {});
    };

    DefaultModel.prototype.defaults = {
      "text": "Unknown Text",
      "timestamp": "Unknown timestamp"
    };

    return DefaultModel;

  })(Backbone.Model);


  /*===============================================================================================
    * Collections
    *======================================================================
   */


  /* Comment Collection */

  DefaultCollection = (function(_super) {
    __extends(DefaultCollection, _super);

    function DefaultCollection() {
      return DefaultCollection.__super__.constructor.apply(this, arguments);
    }

    DefaultCollection.prototype.model = DefaultModel;

    DefaultCollection.prototype.url = '/api/getData';

    DefaultCollection.prototype.initialize = function() {
      this.on('change', function() {});
      console.log('running init function for ArtifactCollection');
      this.fetch({
        async: false
      });
    };

    DefaultCollection.prototype.parse = function(data) {
      console.log('running parse');
      return _.map(data, _.identity);
    };

    DefaultCollection.prototype.reset = function(models, options) {
      if (options && options.parse) {
        delete options.parse(models = this.parse(models));
        Backbone.Collection.prototype.reset.call(this, models, options);
      }
    };

    return DefaultCollection;

  })(Backbone.Collection);


  /*===============================================================================================
    * Workspace
    *======================================================================
   */

  Workspace = (function(_super) {
    __extends(Workspace, _super);

    function Workspace() {
      return Workspace.__super__.constructor.apply(this, arguments);
    }

    Workspace.prototype.routes = {
      "": "home",
      "home": "home",
      "admin": "admin"
    };

    Workspace.prototype.initialize = function() {};

    Workspace.prototype.home = function() {
      console.log('home');
      APP.prototype.GET_DATA(function(data) {
        var defaultView;
        defaultView = new DefaultView();
        defaultView.render(data);
      });
    };

    Workspace.prototype.admin = function() {
      console.log('admin');
    };

    return Workspace;

  })(Backbone.Router);


  /*===============================================================================================
    * Header View
    *======================================================================
   */

  DefaultView = (function(_super) {
    __extends(DefaultView, _super);

    function DefaultView() {
      return DefaultView.__super__.constructor.apply(this, arguments);
    }

    DefaultView.prototype.el = '#appContentWrap';

    DefaultView.prototype.initialize = function() {
      return _.bindAll(this.inputFunc, 'onSignOut', 'onSignIn');
    };

    DefaultView.prototype.inputFunc = {
      value: 'value',
      sgnBtn: '#sign-state',
      onSignIn: function(e) {
        e.preventDefault;
        return console.log('sign in');
      },
      onSignOut: function(e) {
        e.preventDefault;
        return console.log('sign out');
      }
    };

    DefaultView.prototype.render = function(obj) {
      var defaultContentView, defaultHeaderView, el;
      el = this.$el;
      defaultHeaderView = new DefaultHeaderView;
      defaultHeaderView.render(obj);
      defaultContentView = new DefaultContentView;
      defaultContentView.render(obj);
    };

    return DefaultView;

  })(Backbone.View);


  /*===============================================================================================
    * Weather header View
    *======================================================================
   */

  DefaultHeaderView = (function(_super) {
    __extends(DefaultHeaderView, _super);

    function DefaultHeaderView() {
      return DefaultHeaderView.__super__.constructor.apply(this, arguments);
    }

    DefaultHeaderView.prototype.el = '#appHeader';

    DefaultHeaderView.prototype.initialize = function() {
      return _.bindAll(this.inputFunc, 'onLocWeather');
    };

    DefaultHeaderView.prototype.inputFunc = {
      onLocBtn: '#area',
      onLocWeather: function() {
        return APP.prototype.GET_DATA(function(data) {
          return console.log(data);
        });
      }
    };

    DefaultHeaderView.prototype.render = function(obj) {
      var el;
      el = this.$el;
      jade.render(el[0], 'temp-header', {
        'header': 'Test Header'
      });
      $(this.inputFunc.onLocBtn).bind('keyup', {
        'inputFunc': this.inputFunc
      }, function(event) {
        if (event.keyCode === 13) {
          console.log($(this).val);
          event.data.inputFunc.onLocWeather($(this).val);
        }
      });
    };

    return DefaultHeaderView;

  })(Backbone.View);


  /*===============================================================================================
    * Weather content View
    *======================================================================
   */

  DefaultContentView = (function(_super) {
    __extends(DefaultContentView, _super);

    function DefaultContentView() {
      return DefaultContentView.__super__.constructor.apply(this, arguments);
    }

    DefaultContentView.prototype.el = '#appContent';

    DefaultContentView.prototype.initialize = function() {};

    DefaultContentView.prototype.inputFunc = {};

    DefaultContentView.prototype.render = function(obj) {
      var el;
      el = this.$el;
      jade.render(el[0], 'temp-content', {
        'location': 'test'
      });
    };

    return DefaultContentView;

  })(Backbone.View);

  $(document).ready(function() {
    var workspace;
    $(document).on('click', '#id', function() {
      alert(1);
    });
    workspace = new Workspace();
    Backbone.history.start();
    return setTimeout(function() {
      var newBackboneView;
      newBackboneView = new NewBackboneView();
    }, 3 * 1000);
  });

}).call(this);
