const server = require("express").Router();
const { Product, Image } = require('../db.js');
const upload = require('../middlewares/uploadImg')

server.post('/:id', upload , (req, res, next) => {
    const {id} = req.params

    let product = Product.findByPk(id)
    let images = req.files.map(file => (
        Image.create({
            path: `${file.destination}/${file.filename}`
        })
    )) 
    Promise.all([product, ...images])
    .then(([product, ...images]) => product.setImages(images))
    .then(r => Product.findAll({ include: Image }))
    .then(r => res.send(r))
    .catch(next)
})

module.exports = server;