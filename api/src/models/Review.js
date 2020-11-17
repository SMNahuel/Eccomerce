const { DataTypes} = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('review', {
    quealification:{
        type : DataTypes.FLOAT
    }, 
    description: {
        type: DataTypes.TEXT
    }
  });
};