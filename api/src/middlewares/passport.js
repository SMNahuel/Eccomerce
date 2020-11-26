const passport = require('passport');
const user = require('../controllers/user');

passport.use(require('./strategies/local'));
passport.use(require('./strategies/google')); 
passport.use(require('./strategies/facebook'))
passport.use(require('./strategies/github'))

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    user.getById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

const login = passport.authenticate('local')

const loginGoogle = passport.authenticate('google', {scope: ['profile', 'email'], display: 'popup'}) 
const loginGoogleSuccess = passport.authenticate('google', {successRedirect: `${process.env.FRONT_URL}/AuthSuccess`})
const loginFacebook = passport.authenticate('facebook', {scope: ['email'], display: 'popup'})
const loginFacebookSuccess = passport.authenticate('facebook', {successRedirect: `${process.env.FRONT_URL}/AuthSuccess`})
const loginGithub = passport.authenticate('github', {scope: ['user', 'email'], display: 'popup'})
const loginGithubSuccess = passport.authenticate('github', {successRedirect: `${process.env.FRONT_URL}/AuthSuccess`, failureRedirect: '/login'})

module.exports = {
    login,
    loginGoogle, 
    loginGoogleSuccess,
    loginFacebook,
    loginFacebookSuccess,
    loginGithub,
    loginGithubSuccess,
    passport
}