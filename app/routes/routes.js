var Pin = require('../models/pins')

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
		Pin.find({}, function(err, results){
			if(!err){
				res.locals.pins = results
				res.render('index')
			}else{
				console.error(err)
				res.render('index')
			}
		})
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


	app.get('/mypins', isLoggedIn, function(req, res){
		Pin.find( {ownerId: req.user.twitter.id}, function(err, results){
			if(!err){
				res.locals.myPins = results
				res.render('myPins')
			}else{
				console.log(err)
			}
		})
	})

	app.get('/newpin', isLoggedIn, function(req, res){
		res.render('newPin')
	})

	app.post('/newpin', isLoggedIn, function(req, res){
		var newPin = new Pin()
		newPin.url = req.body.url
		newPin.description = req.body.description
		newPin.ownerId = req.user.twitter.id
		newPin.ownerDisplayName = req.user.twitter.displayName
		newPin.save(function(err){
			if(err) throw err
			res.redirect('/mypins')
		})
	})


	app.get('/user/:twitterId', function(req, res){
		Pin.find({ownerId: req.params.twitterId}, function(err, results){
			if(!err){
				res.locals.userWall = results[0].ownerDisplayName
				res.locals.userPins = results
				res.render('user')
			}else{
				console.log(err)
				redirect('/')
			}
		})
	})

	app.get('/delete/:pinId', isLoggedIn, function(req, res){
		Pin.find({ _id: req. params.pinId}).remove().exec(function(err){
			if(err){
				console.log(err)
			}
			res.redirect('/mypins')
		})
	})



}