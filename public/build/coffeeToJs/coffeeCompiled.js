
/*  Assignment */

(function() {
  var MODULE, age, ages, awardMedals, child, contenders, countdown, courses, date, dish, food, foods, footprints, gold, i, mood, num, number, opposite, rest, silver, solipsism, speed, yearsOld, _i, _j, _k, _len, _len1, _len2, _ref,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty;

  number = 42;

  opposite = true;


  /* Conditions */

  if (opposite) {
    number = -42;
  }


  /* if, else, conditional */

  if (singing) {
    mood = greatlyImproved;
  }

  if (happy && knowsit) {
    clapHands();
    chaChaaaa();
  } else {
    showIt();
  }

  date = friday ? sue : jill;


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

}).call(this);
