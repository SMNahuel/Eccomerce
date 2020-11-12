const { User } = require('../db.js');

module.exports = {

    login: function ({ email, password }) {
        if (email && password) {
            return User.findOne({
                where: {
                    email: email,
                    password: password,
                }
            })
            
        }
    }
}