const { DataTypes} = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('order', {
    quantity:{
        type: DataTypes.FLOAT
    },
    price:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
  });
};
