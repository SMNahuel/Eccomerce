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
const { Product, Category, Image, User, Rol, Cart, Order, Review, Comment, Respond } = sequelize.models;

// Aca vendrian las relaciones

// Rol 1 <---> N User
Rol.hasMany(User)
User.belongsTo(Rol)

// Product N <---> M Category
Product.belongsToMany(Category, {through: 'ProductCategory'})
Category.belongsToMany(Product, {through: 'ProductCategory'})

// Product N <---> M Image
Product.belongsToMany(Image, {through: 'ProductImage'})
Image.belongsToMany(Product, {through: 'ProductImage'})

// User 1 <---> 1 Image (la foreign key 'imageId' definida en User)
Image.hasOne(User)
User.belongsTo(Image)

// User 1 <---> N Cart
User.hasMany(Cart)
Cart.belongsTo(User)

// Cart N <---> M Product
Cart.belongsToMany(Product, {through: Order})
Product.belongsToMany(Cart, {through: Order})

//Products 1 <---> N Review 
Product.hasMany(Review)
Review.belongsTo(Product)

//User 1 <---> N Review
User.hasMany(Review)
Review.belongsTo(User)

// Product 1 <--> N Comment
Product.hasMany(Comment)
Comment.belongsTo(Product)

// User 1 <--> N Comment 
User.hasMany(Comment)
Comment.belongsTo(User)

// Comment 1 <---> N Respond
Comment.hasMany(Respond)
Respond.belongsTo(Comment)

// User 1 <--> N Respond
User.hasMany(Respond)
Respond.belongsTo(User)

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
