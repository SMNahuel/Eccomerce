const server = require('express').Router();
const user = require('../controllers/login.js');

server.post('/', (req, res, next) => {
    user.login(req.body)
    .then((r)=> res.send(r))
    .catch(next)
})

module.exports = server;