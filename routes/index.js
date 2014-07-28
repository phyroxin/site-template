/*========================================================
 * Route Models
 *========================================================
 */
exports.index = function(req, res){
	console.log('Home page');
	res.render('index', {
		 title:'Site Template | Home'
		,headerText:'Site Template - Home'
	});
};

exports.about = function(req, res){
	console.log('About page');
	res.render('about', {
		 title:'Site Template | About'
		,headerText:'Site Template - About'
	});
};

exports.contact = function(req, res){
	console.log('Contact page');
	res.render('contact', {
		 title:'Site Template | Contact'
		,headerText:'Site Template - Contact'
	});
};