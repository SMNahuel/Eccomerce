const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('user', {

        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Email address already in use!"
            },
            validate: {
                isEmail: true,
                notEmpty: true
            }
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: false,
            is: /^[0-9a-zA-Z]{7,30}$/i
        }
    })
}