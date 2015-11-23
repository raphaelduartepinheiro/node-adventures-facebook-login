var express = require('express');
var passport = require('passport');
var app = express();
var FacebookTokenStrategy = require('passport-facebook-token');

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new FacebookTokenStrategy({
    clientID: '1518322408478202',
    clientSecret: '9e798282a1136aca98e899107d2ecf2f'
  }, function(accessToken, refreshToken, profile, done) {
	console.log(profile);
	return done(null, profile);
  }
));

app.get('/', passport.authenticate('facebook-token'), function(req, res){
	res.send('Olá!');
});

var server = app.listen(4000, function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log('Exemplo rodando em: http://%s:%s', host, port);
})