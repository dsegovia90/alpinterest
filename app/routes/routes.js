module.exports = function(app, passport){

	function isLoggedIn(req, res, next){
		if(req.isAuthenticated()){
			return next()
		}else{
			res.redirect('/auth/twitter')
		}
	}

	app.use(function(req, res, next){
		res.locals.user = req.user
		next()
	})


	app.get('/', function(req, res){
		res.render('index')
	})

	app.get('/auth/twitter', passport.authenticate('twitter'))
	app.get('/auth/twitter/callback', 
		passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		})
	)

	app.get('/logout', function(req, res){
		req.logout()
		res.redirect('/')
	})



}