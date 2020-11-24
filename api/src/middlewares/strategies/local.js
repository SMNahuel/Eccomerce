const LocalStrategy  = require('passport-local').Strategy;
const user = require('../../controllers/user');

module.exports = new LocalStrategy(
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