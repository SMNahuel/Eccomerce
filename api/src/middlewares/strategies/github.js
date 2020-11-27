const GitHubStrategy = require('passport-github').Strategy;
const user = require('../../controllers/user');


module.exports = new GitHubStrategy({
    clientID: process.env.GITHUB_APP_ID,
    clientSecret: process.env.GITHUB_APP_SECRET,
    callbackURL: '/auth/github/success'
  },
  function(accessToken, refreshToken, profile, done) {
    if (profile.emails && profile.emails[0] && profile.emails[0].value) {
      user.logingProvider('github', profile.id, profile.username, profile.emails[0].value)
      .then(user => done(null, user))
      .catch(err => done(err, false));
    } else {
      done('your github account does not have a public email', false)
    }
  }
)