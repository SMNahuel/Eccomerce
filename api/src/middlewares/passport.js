const passport = require('passport');
const user = require('../controllers/user');

passport.use(require('./strategies/local'));
/* passport.use(require('./strategies/google')); */
passport.use(require('./strategies/facebook'))

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    user.getById(id)
    .then(user => done(null, user))
    .catch(err => done(err));
});

const login = passport.authenticate('local')

/* const loginGoogle = passport.authenticate('google', {scope: ['profile', 'email'], display: 'popup'}) */

const loginFacebook = passport.authenticate('facebook', {scope: ['email'], display: 'popup'})
const loginFacebookSuccess = passport.authenticate('facebook', {successRedirect: `${process.env.FRONT_URL}/AuthSuccess`})

module.exports = {
    login,
    /* loginGoogle, */
    loginFacebook,
    loginFacebookSuccess,
    passport
}