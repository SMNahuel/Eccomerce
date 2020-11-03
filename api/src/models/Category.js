const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

 const Category = sequelize.define('categories', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
      description: {
        type: DataTypes.STRING
      }
    })

module.exports = {
  // defino el modelo
  Category
}
