const server = require("express").Router();
const upload = require("../middleware/upload");

server.post('/:id', upload, (req, res, next) => {
    //console.log(req.file)
    // const {id} = req.params
    // const {path, size, mimetype} = req.file

    // let product = Product.findByPk(id)
    // let image = Image.create({path: path})
    // Promise.all([product, image])
    // .then(([product, image]) => {
    //     //console.log(product)
    //     console.log(image)
    //     product.setImage(image)
    // })
    // .then(r => res.send(r))
    // .catch(next)

    // const filetypes = /jpeg|jpg|png|svg/;
    // if(size >= 3000000) return res.status(400).send('images must be lighter than 3mb')

    // if(!filetypes.test(mimetype)) return res.status(400).send('only extensions [.jpeg, .jpg, .png, .svg] are supported')

    res.send('Image uploaded!')
})

module.exports = server;