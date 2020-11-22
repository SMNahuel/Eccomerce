const { DataTypes } = require('sequelize');

module.exports = ( sequelize ) => {

    sequelize.define('comment', {
        message: {
            type: DataTypes.STRING,
        }
    })
}