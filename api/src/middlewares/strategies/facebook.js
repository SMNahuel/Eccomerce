const FacebookStrategy = require('passport-facebook').Strategy;
const user = require('../../controllers/user');

module.exports = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/success',
    profileFields: ['displayName', 'photos', 'emails']
  },
  function(accessToken, refreshToken, profile, done) {
    user.logingProvider('facebook', profile.id, profile.displayName, profile.emails[0].value)
    .then(user => done(null, user))
    .catch(err => done(err, false));
  } 
)

