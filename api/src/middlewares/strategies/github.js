const GitHubStrategy = require('passport-github').Strategy;
const user = require('../../controllers/user');


module.exports = new GitHubStrategy({
    clientID: process.env.GITHUB_APP_ID,
    clientSecret: process.env.GITHUB_APP_SECRET,
    callbackURL: '/auth/github/success'
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    user.logingProvider(profile.provider, profile.id, profile.username, profile.email)
    .then(user => done(null, user))
    .catch(err => done(err, false));
  }
)