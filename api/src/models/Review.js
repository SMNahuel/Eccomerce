const { DataTypes} = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('review', {
    qualification:{
        type : DataTypes.FLOAT
    }, 
    message: {
        type: DataTypes.TEXT
    }
  });
};