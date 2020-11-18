const server = require('express').Router();
const image = require('../controllers/image');

// Ruta que devuelve una imagen
server.get('/:imageFilename', (req, res, next) => {
    const { imageFilename } = req.params;
    if (!imageFilename) {
        return res.status(400).send('A filename is required to show the image');
    }
    var splitedPath = __dirname.split(/\/|\\/)
    splitedPath.pop()
    res.sendFile(splitedPath.join('/') + '/media/img/' + imageFilename)
})

module.exports = server;