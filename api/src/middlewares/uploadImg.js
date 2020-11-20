const { Product } = require('../db.js');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/media/img')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var createProductUploader = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const { mimetype} = file

        const extensionSupported = /jpg|jpeg|png|svg/.test(mimetype);
        if (!extensionSupported) cb(new Error('only extensions [.jpeg, .jpg, .png, .svg] are supported'))

        cb(null, true)
    }
}).array('image')

var updateProductUploader = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const { id } = req.params
        const { mimetype } = file

        const extensionSupported = /jpg|jpeg|png|svg/.test(mimetype);
        if (!extensionSupported) cb(new Error('only extensions [.jpeg, .jpg, .png, .svg] are supported'))

        Product.findByPk(id)
        .then(product => {
            if (!product) throw `product id: ${id} does not exist`
            cb(null, true)
        })
        .catch(cb)
    }
}).array('image')

var ProfileImageUploader = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const { mimetype} = file

        const extensionSupported = /jpg|jpeg|png|svg/.test(mimetype);
        if (!extensionSupported) cb(new Error('only extensions [.jpeg, .jpg, .png, .svg] are supported'))

        cb(null, true)
    }
}).single('image')

module.exports = {
    createProductUploader,
    updateProductUploader,
    ProfileImageUploader
}