const server = require('express').Router();
const multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
	},
	filename: function (req, file, cb) { 
        cb(null, file.fieldname + '_' + Date.now() + '.jpg')
	}
});

var upload = multer({ storage: storage }).single('Image')

server.post('/', (req, res, next)=> {
  upload(req, res, function (err) {
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