const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const user = require('../controllers/user');

module.exports = new GoogleStrategy(
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