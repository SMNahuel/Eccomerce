const { Image, Product } = require('../db.js');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/media/img')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const { id } = req.params
        const { mimetype, originalname} = file

        const extensionSuported = /jpg|jpeg|png|svg/.test(mimetype);
        if (!extensionSuported) cb(new Error('only extensions [.jpeg, .jpg, .png, .svg] are supported'))

        Product.findByPk(id)
        .then(product => {
            if (!product) throw `product id: ${id} does not exist`
            cb(null, true)
        })
        .catch(cb)
    }
})

module.exports = upload.array('image')