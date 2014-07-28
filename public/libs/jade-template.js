
jade = (function(exports){
/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == Object.prototype.toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
  }
}

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    ac = ac.filter(nulls);
    bc = bc.filter(nulls);
    a['class'] = ac.concat(bc).join(' ');
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function nulls(val) {
  return val != null;
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 * @api private
 */

exports.attrs = function attrs(obj, escaped){
  var buf = []
    , terse = obj.terse;

  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;

  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
        buf.push(key + "='" + JSON.stringify(val) + "'");
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
      } else if (escaped && escaped[key]) {
        buf.push(key + '="' + exports.escape(val) + '"');
      } else {
        buf.push(key + '="' + val + '"');
      }
    }
  }

  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  return String(html)
    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno){
  if (!filename) throw err;

  var context = 3
    , str = require('fs').readFileSync(filename, 'utf8')
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

  return exports;

})({});

jade.templates = {};
jade.render = function(node, template, data) {
  var tmp = jade.templates[template](data);
  node.innerHTML = tmp;
};

jade.templates["temp-admin-question"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="quiz-questions">');
 for (var x=0; x<qNum; x++)
{
 var ql = x+1
buf.push('<div');
buf.push(attrs({ 'id':('question-block-' + (ql) + ''), 'style':('border-bottom: 1px dotted #aaa'), "class": ('question-item') }, {"id":true,"class":true,"style":true}));
buf.push('><label><span style="font-size: 1.7em;" class="label-style">Question ' + escape((interp = ql) == null ? '' : interp) + '</span><input');
buf.push(attrs({ 'id':('question_' + (ql) + ''), 'type':('text'), 'name':('question' + (ql) + ''), 'value':(''), "class": ('question-style') }, {"id":true,"class":true,"type":true,"name":true,"value":true}));
buf.push('/><button class="add-option-style">add option</button></label><br/><div');
buf.push(attrs({ 'id':('question-option-block-' + (ql) + ''), "class": ('question-option-section') }, {"id":true,"class":true}));
buf.push('>');
 for (var y=0; y<oNum; y++)
{
 var ol = y+1
buf.push('<label class="option-label-style"><span class="label-style">Option</span><input');
buf.push(attrs({ 'id':('option_' + (ol) + ''), 'type':('text'), 'name':('option' + (ol) + ''), 'value':(''), "class": ('option-style') }, {"id":true,"class":true,"type":true,"name":true,"value":true}));
buf.push('/><button class="delete-option-style">x</button></label><br/>');
}
buf.push('<label class="option-label-style"><span class="label-style">Correct answer</span><input');
buf.push(attrs({ 'id':('answer_' + (ql) + ''), 'type':('text'), 'name':('answer' + (ql) + ''), 'value':(''), "class": ('answer-style') }, {"id":true,"class":true,"type":true,"name":true,"value":true}));
buf.push('/></label><label class="option-label-style"><span class="label-style">Time to answer</span><input');
buf.push(attrs({ 'id':('time_' + (ql) + ''), 'type':('text'), 'name':('time' + (ql) + ''), 'value':(''), 'maxlength':('2'), 'style':('width: 25px;'), "class": ('time-style') }, {"id":true,"class":true,"type":true,"name":true,"value":true,"maxlength":true,"style":true}));
buf.push('/></label><label class="option-label-style"><span class="label-style">Points</span><input');
buf.push(attrs({ 'id':('point_' + (ql) + ''), 'type':('text'), 'name':('point' + (ql) + ''), 'value':(''), 'maxlength':('2'), 'style':('width: 25px;'), "class": ('point-style') }, {"id":true,"class":true,"type":true,"name":true,"value":true,"maxlength":true,"style":true}));
buf.push('/></label></div></div>');
}
buf.push('<div id="bottom-btn-block"><button name="sbtQuestions" class="bottom-submit-btn">Submit questions</button></div></div>');
}
return buf.join("");
}
jade.templates["temp-admin"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="admin-content" class="admin-style"><div id="admin-quiz-details-wrap">	<div class="dev-header-menu-wrap">	<h4> <a data-id="enter-quiz-data" data-load="" class="admin-btn">Create Quiz</a><a data-id="edit-quiz-data" data-load="loadQuiz" class="admin-btn">Edit Quiz</a><a data-id="upload-question-data" data-load="" class="admin-btn">Upload Questions</a><a data-id="edit-question-data" data-load="loadQuestion" class="admin-btn">Edit Questions</a><a data-id="assign-question-data" data-load="" class="admin-btn">Assign Questions</a></h4></div><div class="admin-page enter-quiz-data"><label><span class="label-style">Category</span><select id="quiz_type">');
// iterate category
;(function(){
  if ('number' == typeof category.length) {
    for (var i = 0, $$l = category.length; i < $$l; i++) {
      var item = category[i];

if ( i == 0)
{
buf.push('<option');
buf.push(attrs({ 'value':('' + (item._id) + ''), 'selected':('selected') }, {"value":true,"selected":true}));
buf.push('>' + escape((interp = item.name) == null ? '' : interp) + '</option>');
}
else
{
buf.push('<option');
buf.push(attrs({ 'value':('' + (item._id) + '') }, {"value":true}));
buf.push('>' + escape((interp = item.name) == null ? '' : interp) + '</option>');
}
    }
  } else {
    for (var i in category) {
      var item = category[i];

if ( i == 0)
{
buf.push('<option');
buf.push(attrs({ 'value':('' + (item._id) + ''), 'selected':('selected') }, {"value":true,"selected":true}));
buf.push('>' + escape((interp = item.name) == null ? '' : interp) + '</option>');
}
else
{
buf.push('<option');
buf.push(attrs({ 'value':('' + (item._id) + '') }, {"value":true}));
buf.push('>' + escape((interp = item.name) == null ? '' : interp) + '</option>');
}
   }
  }
}).call(this);

buf.push('</select></label><br/><label> <span class="label-style">Quiz name</span><input id="quiz_name" type="text" name="quizName" class="question-style"/></label><br/><label> <span class="label-style">Tags</span><input id="quiz_tags" type="text" name="quizTags" placeholder="tag1,tag2,tag3..." class="question-style"/></label><br/><label> <span class="label-style">Start Date</span><input id="quiz_date" type="text" name="quizDate" maxlength="10" placeholder="dd/mm/yyyy" class="question-style"/></label><br/><label><span class="label-style">Start Time</span><input id="quiz_time" type="text" name="quizTime" maxlength="5" placeholder="hh:mm" class="question-style"/></label><br/><label> <span class="label-style">Difficulty</span><select id="question_difficulty" name="questionDifficulty">');
var amtOptions = (['Easy','Medium','Hard']);
// iterate amtOptions
;(function(){
  if ('number' == typeof amtOptions.length) {
    for (var $index = 0, $$l = amtOptions.length; $index < $$l; $index++) {
      var item = amtOptions[$index];

buf.push('<option');
buf.push(attrs({ 'value':('' + (item) + '') }, {"value":true}));
buf.push('>' + escape((interp = item) == null ? '' : interp) + '</option>');
    }
  } else {
    for (var $index in amtOptions) {
      var item = amtOptions[$index];

buf.push('<option');
buf.push(attrs({ 'value':('' + (item) + '') }, {"value":true}));
buf.push('>' + escape((interp = item) == null ? '' : interp) + '</option>');
   }
  }
}).call(this);

buf.push('</select></label><br/><label> <span class="label-style">Allow pause</span><select id="allow_pause" name="allowPause">');
var pOptions = (['yes','no']);
// iterate pOptions
;(function(){
  if ('number' == typeof pOptions.length) {
    for (var $index = 0, $$l = pOptions.length; $index < $$l; $index++) {
      var item = pOptions[$index];

buf.push('<option>' + escape((interp = item) == null ? '' : interp) + '</option>');
    }
  } else {
    for (var $index in pOptions) {
      var item = pOptions[$index];

buf.push('<option>' + escape((interp = item) == null ? '' : interp) + '</option>');
   }
  }
}).call(this);

buf.push('</select></label><br/><div class="bottom-btn-block"><button name="sbtQuestions" class="top-submit-btn">Submit Questions</button></div></div><div class="admin-page edit-quiz-data">Edit quiz</div><div class="admin-page upload-question-data"><div id="quiz-upload"><form action="api/upload" method="post" enctype="multipart/form-data"><input id="upload-quiz-questions" name="uploadFile" type="file" class="inputClass"/><div class="bottom-btn-block"><input id="submit-upload" name="submitFile" type="submit" class="inputClass"/></div></form></div></div><div class="admin-page edit-question-data">Edit question</div><div class="admin-page assign-question-data">Assign question</div></div></div>');
}
return buf.join("");
}
jade.templates["temp-answers"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'id':("" + (answer_id) + ""), "class": ("answerContainer") }, {"class":true,"id":true}));
buf.push('><!--div(class="voteWrap")--><!--	|#{vote}--><div class="answerWrap"><div class="answerText">' + escape((interp = text) == null ? '' : interp) + '</div>');
// iterate userBox
;(function(){
  if ('number' == typeof userBox.length) {
    for (var $index = 0, $$l = userBox.length; $index < $$l; $index++) {
      var user = userBox[$index];

buf.push('<div');
buf.push(attrs({ 'id':("" + (user.userID) + ""), "class": ("userBox") }, {"id":true,"class":true}));
buf.push('></div>');
    }
  } else {
    for (var $index in userBox) {
      var user = userBox[$index];

buf.push('<div');
buf.push(attrs({ 'id':("" + (user.userID) + ""), "class": ("userBox") }, {"id":true,"class":true}));
buf.push('></div>');
   }
  }
}).call(this);

buf.push('</div></div>');
}
return buf.join("");
}
jade.templates["temp-calculating"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="titleWrap"><p class="calculateText">calculating...</p></div>');
}
return buf.join("");
}
jade.templates["temp-comment"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="commentWrap"><div><input');
buf.push(attrs({ 'id':('cmt'), 'name':('commTxt'), 'type':('text'), 'placeholder':('' + (placeText) + ''), "class": ('inputClass') }, {"id":true,"class":true,"name":true,"type":true,"placeholder":true}));
buf.push('/></div></div>');
}
return buf.join("");
}
jade.templates["temp-comments"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<small>' + escape((interp = user) == null ? '' : interp) + ' says:</small><br/><' + (text) + '></' + (text) + '><br/><strong><small>Posted ' + escape((interp = timestamp) == null ? '' : interp) + '</small></strong>');
}
return buf.join("");
}
jade.templates["temp-counter"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="cntWrap"><h2>' + escape((interp = titleText) == null ? '' : interp) + '</h2><div id="count-num" class="numClass">' + escape((interp = time) == null ? '' : interp) + '</div></div>');
}
return buf.join("");
}
jade.templates["temp-dev-tools"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="dev-wrap-style"><div class="dev-contents-style"><div class="dev-btns-wrap"><div class="titleWrap"><button');
buf.push(attrs({ 'id':('adminPg'), 'name':('admin_Pg'), 'style':('display:' + (adminBtn.state) + '; margin:10px; float:left;'), "class": ('btn') + ' ' + ('btn-sm') + ' ' + ('btn-primary') + ' ' + ('button-createDigest') }, {"name":true,"style":true}));
buf.push('>' + escape((interp = adminBtn.text) == null ? '' : interp) + '</button><button');
buf.push(attrs({ 'id':('homePg'), 'name':('admin_Pg'), 'style':('display:' + (homeBtn.state) + '; margin:10px; float:left;'), "class": ('btn') + ' ' + ('btn-sm') + ' ' + ('btn-primary') + ' ' + ('button-createDigest') }, {"name":true,"style":true}));
buf.push('>' + escape((interp = homeBtn.text) == null ? '' : interp) + '</button><button');
buf.push(attrs({ 'id':('createDB'), 'name':('create_DB'), 'style':('display:' + (dbBtn.state) + '; margin:10px; float:left;'), "class": ('btn') + ' ' + ('btn-sm') + ' ' + ('btn-primary') + ' ' + ('button-createDigest') }, {"name":true,"style":true}));
buf.push('>' + escape((interp = dbBtn.text) == null ? '' : interp) + '</button><button');
buf.push(attrs({ 'id':('clearDB'), 'name':('clear_DB'), 'style':('display:' + (clrBtn.state) + '; margin:10px; float:left;'), "class": ('btn') + ' ' + ('btn-sm') + ' ' + ('btn-primary') + ' ' + ('button-createDigest') }, {"name":true,"style":true}));
buf.push('>' + escape((interp = clrBtn.text) == null ? '' : interp) + '</button><button');
buf.push(attrs({ 'id':('leaveTbl'), 'name':('leave_tbl'), 'style':('display:' + (lvBtn.state) + '; margin:10px; float:left;'), "class": ('btn') + ' ' + ('btn-sm') + ' ' + ('btn-primary') + ' ' + ('button-createDigest') }, {"name":true,"style":true}));
buf.push('>' + escape((interp = lvBtn.text) == null ? '' : interp) + '</button><button');
buf.push(attrs({ 'id':('start-quiz'), 'name':('start_quiz'), 'style':('display:' + (startBtn.state) + '; margin:10px; float:left;'), "class": ('btn') + ' ' + ('btn-sm') + ' ' + ('btn-primary') + ' ' + ('button-createDigest') }, {"name":true,"style":true}));
buf.push('>' + escape((interp = startBtn.text) == null ? '' : interp) + '</button></div></div></div></div><div class="dev-wrap-outer-style"><button class="open-dev-btn btn btn-sm btn-primary">open</button></div>');
}
return buf.join("");
}
jade.templates["temp-edit-quiz-item"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="quiz-item-wrap">' + escape((interp = quizItem._id) == null ? '' : interp) + '\n' + escape((interp = quizItem.allow_pause) == null ? '' : interp) + '\n' + escape((interp = quizItem.question_difficulty) == null ? '' : interp) + '\n' + escape((interp = quizItem.quiz_date) == null ? '' : interp) + '\n' + escape((interp = quizItem.quiz_name) == null ? '' : interp) + '');
// iterate quizItem.quiz_tags
;(function(){
  if ('number' == typeof quizItem.quiz_tags.length) {
    for (var $index = 0, $$l = quizItem.quiz_tags.length; $index < $$l; $index++) {
      var tag = quizItem.quiz_tags[$index];

buf.push('<span>' + escape((interp = tag) == null ? '' : interp) + '</span>');
    }
  } else {
    for (var $index in quizItem.quiz_tags) {
      var tag = quizItem.quiz_tags[$index];

buf.push('<span>' + escape((interp = tag) == null ? '' : interp) + '</span>');
   }
  }
}).call(this);

buf.push('' + escape((interp = quizItem.quiz_time) == null ? '' : interp) + '\n' + escape((interp = quizItem.quiz_type) == null ? '' : interp) + '</div>');
}
return buf.join("");
}
jade.templates["temp-edit-quiz"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="quiz-list-wrap">');
// iterate quizObj
;(function(){
  if ('number' == typeof quizObj.length) {
    for (var $index = 0, $$l = quizObj.length; $index < $$l; $index++) {
      var quizItem = quizObj[$index];

buf.push('<div class="quiz-list-item"><a');
buf.push(attrs({ 'data-id':("" + (quizItem.quiz_name) + ""), "class": ("quiz-item-btn") }, {"class":true,"data-id":true}));
buf.push('>' + escape((interp = quizItem.quiz_name) == null ? '' : interp) + '&nbsp;-&nbsp;' + escape((interp = quizItem.quiz_date) == null ? '' : interp) + '</a><div class="make-active-wrap"><input type="radio" name="active" class="make-active-btn"/></div></div>');
    }
  } else {
    for (var $index in quizObj) {
      var quizItem = quizObj[$index];

buf.push('<div class="quiz-list-item"><a');
buf.push(attrs({ 'data-id':("" + (quizItem.quiz_name) + ""), "class": ("quiz-item-btn") }, {"class":true,"data-id":true}));
buf.push('>' + escape((interp = quizItem.quiz_name) == null ? '' : interp) + '&nbsp;-&nbsp;' + escape((interp = quizItem.quiz_date) == null ? '' : interp) + '</a><div class="make-active-wrap"><input type="radio" name="active" class="make-active-btn"/></div></div>');
   }
  }
}).call(this);

buf.push('<div class="selected-quiz-wrap"></div></div>');
}
return buf.join("");
}
jade.templates["temp-football-content"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="appFootballNow" class="app-football-now float"><table class="standings-table-style"><tr class="table-header-row"><th>Team</th><th>Wins</th><th>Losses</th><th>Progress</th><th>Points</th></tr>');
// iterate teams
;(function(){
  if ('number' == typeof teams.length) {
    for (var i = 0, $$l = teams.length; i < $$l; i++) {
      var team = teams[i];

buf.push('<tr class="table-data-row"><td>' + escape((interp = team.stand_team_name) == null ? '' : interp) + '</td><td>' + escape((interp = team.stand_overall_w) == null ? '' : interp) + '</td><td>' + escape((interp = team.stand_overall_l) == null ? '' : interp) + '</td><td>' + escape((interp = team.stand_status) == null ? '' : interp) + '</td><td>' + escape((interp = team.stand_points) == null ? '' : interp) + '</td></tr>');
    }
  } else {
    for (var i in teams) {
      var team = teams[i];

buf.push('<tr class="table-data-row"><td>' + escape((interp = team.stand_team_name) == null ? '' : interp) + '</td><td>' + escape((interp = team.stand_overall_w) == null ? '' : interp) + '</td><td>' + escape((interp = team.stand_overall_l) == null ? '' : interp) + '</td><td>' + escape((interp = team.stand_status) == null ? '' : interp) + '</td><td>' + escape((interp = team.stand_points) == null ? '' : interp) + '</td></tr>');
   }
  }
}).call(this);

buf.push('</table></div>');
}
return buf.join("");
}
jade.templates["temp-football-header"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="appFootballHeaderText" class="app-football-header-style"><h2 class="float">Football Droid &nbsp;&nbsp;</h2><span>' + escape((interp = season) == null ? '' : interp) + '</span></div><div id="appFootballHeaderMenu" class="app-football-header-menu"></div>');
}
return buf.join("");
}
jade.templates["temp-header-dev"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<header><div id="menu-container"><menu><div class="left"><li><a href="">Games</a></li><li><a href="">Leagues</a></li><li><a href="">Our pub</a></li></div><div class="right"><li><a href="">Account</a></li><li><a href="">Friends</a></li><li><a id="sign-state" href="">' + escape((interp = signState) == null ? '' : interp) + '</a></li></div></menu><div id="user"></div></div><div class="header-question-panel-wrap"><div class="header-question-panel-contents"><div class="table-icons"><div class="table-icons-contents"><div class="table-icon"></div><div class="table-icon"></div><div class="table-icon"></div><div class="table-icon"></div></div></div><div class="question-header"><div class="question-text-contents"><p></p></div></div><div class="question-time"><div id="question-timer" class="question-time-contents"></div></div></div></div></header><div id="sign-in-wrap" class="sign-in-wrap-style"></div>');
}
return buf.join("");
}
jade.templates["temp-header"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<header><div id="menu-container"><menu><div class="left"><li><a href="">Games</a></li><li><a href="">Leagues</a></li><li><a href="">Our pub</a></li></div><div class="right"><li><a href="">Account</a></li><li><a href="">Friends</a></li><li><a id="sign-state" href="">' + escape((interp = signState) == null ? '' : interp) + '</a></li></div></menu><div id="user"></div></div><div class="center"><img src="./images/new-ui/banner-left.svg" class="banner-left"/><img src="./images/new-ui/banner-right.svg" class="banner-right"/><div class="vert"><img src="./images/new-ui/triangle-left.svg" class="tri left"/><img src="./images/new-ui/triangle-right.svg" class="tri right"/><div class="banner-middle"><img src="./images/new-ui/banner-middle.svg"/><img src="./images/new-ui/redtangle.png" class="redtangle"/><h1>Game Lobby</h1></div></div><div class="promo"><div class="inner"><img src="./images/new-ui/your-pub.png"/></div></div></div><div class="header-lobby"><div class="middle"><div id="timer"><h5 id="timer-text" class="timer-text-style">00:00</h5></div><button id="jump-in"><span>Jump In!</span></button><p>Click above to be automatically assigned to a table</p></div><div class="left"><div class="inner-bg"><img src="./images/new-ui/lobby-header-left.png" class="bg"/><img src="./images/new-ui/triangle-left-upper.svg" class="tri"/></div><div class="inner"><h2>Choose a Table</h2><p>Grab a spot on any table with a free seat. If you prefer, just hit Jump In on the right and we’ll sit you on a free table.</p></div></div><div class="right"><div class="inner-bg"><img src="./images/new-ui/lobby-header-right.png" class="bg"/><img src="./images/new-ui/triangle-right-upper.svg" class="tri"/></div><div class="inner"><h2>Private Tables</h2><p>Want to play with just your friends?  Click this banner to set up a private table, or join one below if you have a passcode.</p></div></div></div><div class="header-question-panel-wrap"><div class="header-question-panel-contents"><div class="table-icons"><div class="table-icons-contents"><div class="table-icon"></div><div class="table-icon"></div><div class="table-icon"></div><div class="table-icon"></div></div></div><!--div(class=\'question-header\')--><!--	div(class=\'question-header-contents\')--><!--		p--><!--			|question header--><div class="question-time"><div id="question-timer" class="question-time-contents"></div></div><div class="question-text"><div class="question-text-contents"><p>question text</p></div></div></div></div></header><div id="sign-in-wrap" class="sign-in-wrap-style"></div>');
}
return buf.join("");
}
jade.templates["temp-input"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="arrow-wrap"></div><div class="cmtWrap"><div><label>Username &nbsp;<input');
buf.push(attrs({ 'id':('usr'), 'name':('regTxt'), 'type':('text'), 'placeholder':('' + (placeText) + ''), "class": ('inputClass') }, {"name":true,"type":true,"placeholder":true}));
buf.push('/></label></div></div>');
}
return buf.join("");
}
jade.templates["temp-loader"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="titleWrap"><p class="loadingText">loading...</p></div>');
}
return buf.join("");
}
jade.templates["temp-lobby"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'id':('' + (table_id) + ''), "class": ("table-wrap") }, {"id":true,"class":true}));
buf.push('><h4>' + escape((interp = table_label) == null ? '' : interp) + '<p id="tCount">' + escape((interp = table_count) == null ? '' : interp) + ' seated</p></h4></div>');
}
return buf.join("");
}
jade.templates["temp-marker"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div');
buf.push(attrs({ 'id':("marker_" + (id) + ""), 'style':("" + (style) + ""), "class": ("userMarker") }, {"id":true,"class":true,"style":true}));
buf.push('></div>');
}
return buf.join("");
}
jade.templates["temp-option"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<label class="option-label-style"><span class="label-style">Option ' + escape((interp = n) == null ? '' : interp) + '</span><input');
buf.push(attrs({ 'id':("option_" + (n) + ""), 'type':("text"), 'name':("option" + (n) + ""), "class": ("option-style") }, {"id":true,"class":true,"type":true,"name":true}));
buf.push('/><button class="delete-option-style">x</button></label><br/>');
}
return buf.join("");
}
jade.templates["temp-question-number"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="question-number-wrap"><h3>' + escape((interp = questionNum) == null ? '' : interp) + '</h3></div>');
}
return buf.join("");
}
jade.templates["temp-question"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="question-wrap"><h3');
buf.push(attrs({ 'id':('' + (questionID) + '') }, {"id":true}));
buf.push('>' + escape((interp = questionText) == null ? '' : interp) + '</h3></div>');
}
return buf.join("");
}
jade.templates["temp-result"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="result-content" class="result-style"><h4>' + escape((interp = headerText) == null ? '' : interp) + '</h4><p>' + escape((interp = lineOne) == null ? '' : interp) + '</p><p>' + escape((interp = lineTwo) == null ? '' : interp) + '</p></div>');
}
return buf.join("");
}
jade.templates["temp-tables"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
// iterate tableObject
;(function(){
  if ('number' == typeof tableObject.length) {
    for (var $index = 0, $$l = tableObject.length; $index < $$l; $index++) {
      var table = tableObject[$index];

buf.push('<li id="tMod" class="table-model"><div');
buf.push(attrs({ 'id':('' + (table.table_id) + ''), "class": ('table-wrap') }, {"id":true,"class":true}));
buf.push('><div class="table-header-wrap">	<h4>' + escape((interp = table.table_label) == null ? '' : interp) + '</h4><p');
buf.push(attrs({ "class": ('' + (table.table_id) + '') }, {"class":true}));
buf.push('><span class=\'table_number\'>' + escape((interp = table.table_count) == null ? '' : interp) + '</span> \nseated</p></div><div class="table-users"><div class="table-user-wrap"><div class="table-user-wrap"><div class="table-user-image"><img src="./images/user-icon.jpg"/></div><div class="table-user-text"><h5>Lamin Camps</h5></div><div class="table-user-stat"><p>10</p></div></div></div></div></div></li>');
    }
  } else {
    for (var $index in tableObject) {
      var table = tableObject[$index];

buf.push('<li id="tMod" class="table-model"><div');
buf.push(attrs({ 'id':('' + (table.table_id) + ''), "class": ('table-wrap') }, {"id":true,"class":true}));
buf.push('><div class="table-header-wrap">	<h4>' + escape((interp = table.table_label) == null ? '' : interp) + '</h4><p');
buf.push(attrs({ "class": ('' + (table.table_id) + '') }, {"class":true}));
buf.push('><span class=\'table_number\'>' + escape((interp = table.table_count) == null ? '' : interp) + '</span> \nseated</p></div><div class="table-users"><div class="table-user-wrap"><div class="table-user-wrap"><div class="table-user-image"><img src="./images/user-icon.jpg"/></div><div class="table-user-text"><h5>Lamin Camps</h5></div><div class="table-user-stat"><p>10</p></div></div></div></div></div></li>');
   }
  }
}).call(this);

}
return buf.join("");
}
jade.templates["temp-upload-quiz"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="quiz-upload"><form action="api/upload" method="post" enctype="multipart/form-data"><input id="upload-quiz-questions" name="uploadFile" type="file" class="inputClass"/><input id="submit-upload" name="submitFile" type="submit" class="inputClass"/></form></div>');
}
return buf.join("");
}
jade.templates["temp-user"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div style="height:30px;" class="user-wrap"><div');
buf.push(attrs({ 'id':("icon_" + (id) + ""), 'style':("background-color:" + (col) + ";"), "class": ("userIcon") }, {"id":true,"class":true,"style":true}));
buf.push('></div><div');
buf.push(attrs({ 'id':("" + (id) + ""), "class": ("userName") }, {"id":true,"class":true}));
buf.push('>' + escape((interp = user) == null ? '' : interp) + '</div></div>');
}
return buf.join("");
}
jade.templates["temp-weather-content"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="appWeatherNow" class="app-weather-now float"><p>Location: ' + escape((interp = location) == null ? '' : interp) + '</p><h3>' + escape((interp = temp) == null ? '' : interp) + '&deg;C</h3><p>Observation time: ' + escape((interp = observation_time) == null ? '' : interp) + '</p></div><div id="appWeatherDays" class="app-weather-days float"><div class="sub-header"><p>Cloud cover</p></div><div><span>' + escape((interp = cloudcover) == null ? '' : interp) + '<span class="smallSpan">%</span></span></div><div class="sub-header"><p>Humidity</p></div><div><span>' + escape((interp = humidity) == null ? '' : interp) + '<span class="smallSpan">%</span></span></div><div class="sub-header"><p>Pressure</p></div><div><span>' + escape((interp = pressure) == null ? '' : interp) + ' <span class="smallSpan">millibars</span></span></div><div class="sub-header"><p>	\nWind Speed</p></div><div><span>' + escape((interp = windspeedKmph) == null ? '' : interp) + '<span class="smallSpan">	\nMph</span></span></div><div class="sub-header"><p>	\nWind Direction</p></div><div><span>' + escape((interp = winddir16Point) == null ? '' : interp) + '</span></div></div><div id="appWeatherMap" class="app-weather-map float"><p></p></div><div id="appWeatherSummary" class="app-weather-summary float"><p></p></div>');
}
return buf.join("");
}
jade.templates["temp-weather-header"] = function(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div id="appWeatherHeaderText" class="app-weather-header-style"><h2>Weather Bot &nbsp;&nbsp;<input id="area" type="text" placeholder="enter a city or postcode" class="area-style"/></h2></div><div id="appWeatherHeaderMenu" class="app-weather-header-menu"></div>');
}
return buf.join("");
}