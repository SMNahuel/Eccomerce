const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('user', {

        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
            /* unique: {
                args: true,
                msg: "Email address already in use!"
            },
            validate: {
                isEmail: true,
                notEmpty: true
            } */
        },
        password: {
            type: DataTypes.STRING(30)
            //is: /^[0-9a-zA-Z]{7,30}$/i
        },
<<<<<<< HEAD
        googleId: {
            type: DataTypes.STRING
        },
        githubId: {
            type: DataTypes.STRING
        },
        facebookId: {
            type: DataTypes.STRING
        },
=======
        provider:{
            type: DataTypes.STRING
        },
        providerId:{
            type: DataTypes.STRING
        }
>>>>>>> 77101a4897448a1c319447a40c8b4340e21ebf1e
    })
}