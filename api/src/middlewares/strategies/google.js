const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const user = require('../../controllers/user');

module.exports = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CONSUMER_KEY,
        clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
        callbackURL: '/auth/google/success',
        passReqToCallback   : true
    },
    function(request, accessToken, refreshToken, profile, done) {
        user.logingProvider('google', profile.id, profile.displayName, profile.emails[0].value)
        .then(user => done(null, user))
        .catch(err => done(err, false));
    }
)