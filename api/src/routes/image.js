const server = require('express').Router();
const image = require('../controllers/image');


server.get('/:imageFilename', (req, res, next) => {
    const { imageFilename } = req.params;
    if (!imageFilename) {
        return next(new Error('A filename is required to show the image'));
    }
    const path = __dirname.split('\\').slice(0,6).join('\\')
    res.sendFile(path + '\\media\\img\\' + imageFilename)
})

module.exports = server;