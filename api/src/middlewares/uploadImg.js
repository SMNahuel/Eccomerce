const { Image } = require('../db.js');
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/media/img')
    },
    filename: function (req, file, cb) {
        cb(null, req.params.id + '-' + file.originalname)
    }
})

var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, cb) {
        const extensionSuported = /jpg|jpeg|png|svg/.test(file.mimetype);
        if (!extensionSuported) cb(new Error('only extensions [.jpeg, .jpg, .png, .svg] are supported'))

        const path = "src/media/img/" + req.params.id + '-' + file.originalname;
        Image.findOne({ where:{path: path} })
        .then(img => {
            if (img) {
                cb(new Error('that img already exist'))
            } else {
                cb(null, true)
            }
        })
    }
})

module.exports = upload.array('image')