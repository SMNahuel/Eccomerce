const { DataTypes} = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('cart', {
    state:{
        type : DataTypes.ENUM({
            values:['created', 'in process', 'canceled', 'completed']
        }),
        defaultValue: 'in process'
    }
  });
};
