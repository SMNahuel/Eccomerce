const server = require('express').Router();
const image = require('../controllers/image');


server.get('/:imageFilename', (req, res, next) => {
    const { imageFilename } = req.params;
    if (!imageFilename) {
        return next(new Error('A filename is required to show the image'));
    }
    var splitedPath = __dirname.split(/\/|\\/)
    splitedPath.pop()
    res.sendFile(splitedPath.join('/') + '/media/img/' + imageFilename)
})

module.exports = server;