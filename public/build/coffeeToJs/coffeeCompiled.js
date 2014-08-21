
/*  Assignment */

(function() {
  var Animal, Horse, MODULE, NewBackboneView, Snake, age, ages, awardMedals, chaChaaaa, child, clapHands, contenders, countdown, courses, date, dish, eat, food, foods, footprints, friday, gold, greatlyImproved, happy, i, knowsit, menu, mood, newBackboneView, num, number, opposite, rest, sam, silver, singing, solipsism, speed, tom, yearsOld, _i, _j, _k, _len, _len1, _len2, _ref,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  number = 42;

  greatlyImproved = happy = 'yes';

  opposite = singing = knowsit = true;

  friday = true;


  /* Conditions */

  if (opposite) {
    number = -42;
  }


  /* if, else, conditional */

  if (singing) {
    mood = greatlyImproved;
  }

  clapHands = function(say) {
    return alert(say);
  };

  chaChaaaa = function(dance) {
    return alert(dance);
  };

  if (happy && knowsit) {
    clapHands('CLAP!! CLAP!!');
    chaChaaaa('Tango time!');
  } else {
    showIt();
  }

  date = friday ? 'sue' : 'jill';

  alert('You havea date with ' + date);


  /* Modules */

  MODULE = (function($, PARENT) {
    var add, config;
    config = {
      test: 'value'
    };
    add = function(x, y) {
      var result;
      result = x + y;
      return result;
    };
    PARENT.prototype.ADD = add;
    return PARENT;
  })(jQuery, APP || {});


  /* splats */

  gold = silver = rest = "unknown";

  awardMedals = function() {
    var first, others, second, sivler;
    first = arguments[0], second = arguments[1], others = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    gold = first;
    sivler = second;
    return rest = others;
  };

  contenders = ["Michael Phelps", "Liu Xiang", "Yao Ming", "Allyson Felix", "Shawn Johnson", "Roman Sebrle", "Guo Jingjing"];

  awardMedals.apply(null, contenders);

  alert("Gold: " + gold);

  alert("Silver: " + silver);

  alert("The Fields " + rest);


  /* loops */

  eat = function(foodItem) {
    return alert('I\'m eating ' + foodItem);
  };

  menu = function(foodNum, foodChoice) {
    return alert(foodChoice + ' is menu number ' + foodNum);
  };

  _ref = ['toast', 'cheese', 'wine'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    food = _ref[_i];
    eat(food);
  }

  courses = ['greens', 'caviar', 'truffles', 'roast', 'cake'];

  for (i = _j = 0, _len1 = courses.length; _j < _len1; i = ++_j) {
    dish = courses[i];
    menu(i + i, dish);
  }

  foods = ['broccoli', 'spinach', 'chocolate'];

  for (_k = 0, _len2 = foods.length; _k < _len2; _k++) {
    food = foods[_k];
    if (food !== 'chocolate') {
      eat(food);
    }
  }


  /* comprehensions */

  countdown = (function() {
    var _l, _results;
    _results = [];
    for (num = _l = 10; _l >= 1; num = --_l) {
      _results.push(num);
    }
    return _results;
  })();

  yearsOld = {
    max: 10,
    ida: 9,
    tim: 11
  };

  ages = (function() {
    var _results;
    _results = [];
    for (child in yearsOld) {
      if (!__hasProp.call(yearsOld, child)) continue;
      age = yearsOld[child];
      _results.push("" + child + " is " + age);
    }
    return _results;
  })();


  /* existentials */

  if ((typeof mind !== "undefined" && mind !== null) && (typeof world === "undefined" || world === null)) {
    solipsism = true;
  }

  speed = 0;

  if (speed == null) {
    speed = 15;
  }

  footprints = typeof yeti !== "undefined" && yeti !== null ? yeti : "bear";


  /* classes */

  Animal = (function() {
    function Animal(name) {
      this.name = name;
    }

    Animal.prototype.move = function(meters) {
      return alert(this.name + (" moved " + meters + "m."));
    };

    return Animal;

  })();

  Snake = (function(_super) {
    __extends(Snake, _super);

    function Snake() {
      return Snake.__super__.constructor.apply(this, arguments);
    }

    Snake.prototype.move = function() {
      alert("Slithering...");
      return Snake.__super__.move.call(this, 5);
    };

    return Snake;

  })(Animal);

  Horse = (function(_super) {
    __extends(Horse, _super);

    function Horse() {
      return Horse.__super__.constructor.apply(this, arguments);
    }

    Horse.prototype.move = function() {
      alert("Galloping...");
      return Horse.__super__.move.call(this, 45);
    };

    return Horse;

  })(Animal);

  sam = new Snake("Sammy the Python");

  tom = new Horse("Tommy the Horse");

  sam.move();

  tom.move();


  /* backbone */

  NewBackboneView = (function(_super) {
    var inputFunc;

    __extends(NewBackboneView, _super);

    function NewBackboneView() {
      return NewBackboneView.__super__.constructor.apply(this, arguments);
    }

    NewBackboneView.prototype.el = $('#appWeatherNow');

    NewBackboneView.prototype.initialize = function() {
      alert('init action');
      _.bindAll(this, this.buttonFunc);
      return this.render();
    };

    inputFunc = {
      button: '.buttonName',
      buttonFunc: function() {
        return alert('button action');
      }
    };

    NewBackboneView.prototype.render = function() {
      $(this.el).append('<b>This is an input from coffee-scripted backbone!</b>');
      $(this.inputFunc.button).on("click", {
        _that: this.inputFunc.button
      }, this.inputFunc.buttonFunc);
    };

    return NewBackboneView;

  })(Backbone.View);

  newBackboneView = new NewBackboneView();

}).call(this);
