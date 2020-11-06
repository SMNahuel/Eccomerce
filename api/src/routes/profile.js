const server = require('express').Router();
const multer = require('multer');


var storage = multer.diskStorage({
    destination: (req, file, cb)=> {
        cb(null, '/uploads')
	},
	filename: (req, file, cb) => { 
        cb(null, file.fieldname + '_' + Date.now() + '.jpg')
	}
});


server.post('/', (req, res, next)=> {
    var upload = multer({ storage: storage }).single('Image')
    upload(req, res, (err) => {
        console.log(req.file)
        if (err ) {
        return 'Error!'
        }
        res.json({
            succes: true, 
            message: 'Image uploaded'
        })
    });
});

module.exports = server;