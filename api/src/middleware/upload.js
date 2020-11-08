var multer = require('multer');

//configMulter
var storage = multer.diskStorage({
    destination: './uploads/',
    limits: {fileSize: 3000000},
    fileFilter: (req, res, cd) => {
        const filetypes = /jpeg|jpg|png|svg/;
        if(filetypes.test(file.mimetype)) return cb (null, true)
        cb('only extensions [.jpeg, .jpg, .png, .svg] are supported')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname) 
    }
})

//middleware
const upload = multer({
    storage,
    dest: './uploads/'

}).single('image')

module.exports = upload;


// const multer = require("multer");

// const imageFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb("Please upload only images.", false);
//   }
// };

// var storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, __basedir + "/resources/static/assets/uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
// module.exports = uploadFile;