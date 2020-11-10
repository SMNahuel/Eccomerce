const server = require('express').Router();
const user = require('../controllers/user');

server.get('/', (req, res, next) => {
    user.read()
    .then(r => res.send(r))
    .catch(next);
})

server.post('/', (req, res, next) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        return next(new Error('Body must have a name, email and password'))
    }
    user.create(req.body)
    .then(r => res.send())
    .catch(next)
})

server.put('/:id', (req, res, next) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).send('I need an id to modify the User')
    }
    user.update(id, req.body)
    .then(r => res.send(r))
    .catch(next)
})

server.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).send('I need an id to Delete the User')
    }
    user.delete(id)
    .then(r => res.send(r))
    .catch(next);
})

module.exports = server;