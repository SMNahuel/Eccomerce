const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('user', {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
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
            type: DataTypes.STRING(30)
            //is: /^[0-9a-zA-Z]{7,30}$/i
        },
        googleId:{
            type: DataTypes.STRING
        },
        facebookId:{
            type: DataTypes.STRING
        },
        githubId:{
            type: DataTypes.STRING
        },
        pais: {
            type: DataTypes.STRING
        },
        provincia: {
            type: DataTypes.STRING
        },
        localidad: {
            type: DataTypes.STRING
        },
        codigoPostal: {
            type: DataTypes.STRING
        },
        calle: {
            type: DataTypes.STRING
        },
        num: {
            type: DataTypes.STRING
        },
        departamento: {
            type: DataTypes.STRING
        },
        telefono: {
            type: DataTypes.STRING
        }
    })
}