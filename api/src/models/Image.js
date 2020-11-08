const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Image = sequelize.define("image", {
      path: {
        type: DataTypes.STRING,
      },
    });
  
    return Image;
};