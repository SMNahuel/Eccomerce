const { DataTypes } = require('sequelize');

module.exports = ( sequelize ) => {

    sequelize.define('respond', {
        message: {
            type: DataTypes.STRING,
        }
    })
}