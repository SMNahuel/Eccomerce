const passport = require('passport');
const LocalStrategy  = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const user = require('../controllers/user');
const faceStrategy = require('./facebook');
passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password'
		},
		(email, password, done) => {
            user.login(email, password)
            .then(user => done(null, user))
            .catch(err => done(err, false));
		}
	)
);

<<<<<<< HEAD
passport.use(
    new GoogleStrategy(
        {
            consumerKey: passport.env.GOOGLE_CONSUMER_KEY,
            consumerSecret: passport.env.GOOGLE_CONSUMER_SECRET,
            callbackURL: '/auth/google/redirect'
        },
        function(token, tokenSecret, profile, done) {
            console.log(profile);
            user.logingGoogle(profile)
            .then(user => done(null, user))
            .catch(err => done(err, false));
        }
    )
);
=======
passport.use(faceStrategy)
>>>>>>> 77101a4897448a1c319447a40c8b4340e21ebf1e

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    user.getById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

module.exports = {
    login: passport.authenticate('local'),

    loginGoogle: passport.authenticate('google', {scope: ['profile', 'email'], display: 'popup'}),

    logout: (req, res)=> (req.logout(),res.send({})),

    forOwner: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(400).send('You must be authenticated to access this route');
        }
        if (req.user.rolId < 5) {
            return res.status(400).send('You must be a Owner to access this route');
        }
        next();
    },

    forAdmin: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(400).send('You must be authenticated to access this route');
        }
        if (req.user.rolId < 4) {
            return res.status(400).send('You must be a Admin to access this route');
        }
        next();
    },

    forGuest: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(400).send('You must be authenticated to access this route');
        }
        if (req.user.rolId < 3) {
            return res.status(400).send('You must be registered to access this route');
        }
        next();
    },

    forAnonym: (req, res, next) => {
        if (!req.isAuthenticated()) {
            return res.status(400).send('You must be authenticated to access this route');
        }
        if (req.user.rolId < 2) {
            return res.status(400).send('Your account has been banned contact the company to recover your account');
        }
        next();
    },

    passport: passport,
}