require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { Product, Category, Image, User, Rol, Cart, Order } = sequelize.models;

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
User.hasOne(Rol)
Rol.belongsToMany(User, {through: 'UserRol'})
Product.belongsToMany(Category, {through: 'ProductCategory'})
Category.belongsToMany(Product, {through: 'ProductCategory'})
Image.belongsToMany(Product, {through: 'ProductImage'})
Product.belongsToMany(Image, {through: 'ProductImage'})
Cart.belongsTo(User)
User.hasMany(Cart)
Order.belongsTo(Cart)
Cart.hasMany(Order)
Order.hasOne(Product)
Product.belongsTo(Order)

/* // Carrito pertenece a un usuario
Cart.hasOne(User)
//Usuario tiene muchos carritos
User.belongsToMany(Cart)
//Pertenece a un carrito
Order.hasOne(Cart)
//Carrito tiene muchas ordenes
Cart.belongsToMany(Order)

Order.hasOne(Product)
Product.belongsToMany(Order) */

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
