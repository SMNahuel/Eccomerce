const { DataTypes} = require('sequelize');


module.exports = (sequelize) => {
  sequelize.define('cart', {
    state:{
        type : DataTypes.ENUM({
            values:['cart', 'created', 'processing', 'canceled', 'completed']
        }),
        defaultValue: 'cart'
    },
    emailTo:{
      type: DataTypes.STRING
    }
  });
};
