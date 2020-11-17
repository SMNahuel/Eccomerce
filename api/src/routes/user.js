const server = require('express').Router();
const user = require('../controllers/user');

server.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        return next(new Error('Body must have a email for login'))
    }
    if (!password) {
        return next(new Error('Body must have a password for login'))
    }
    user.login(req.body)
    .then(r => res.cookie("userId", r[0]).send(r[1]))
    .catch(next)
})

server.post('/register', (req, res, next) => {
    const { email, name, password} = req.body;
    if (!email) {
        return next(new Error('Body must have a email for register'))
    }
    if (!name) {
        return next(new Error('Body must have a name for register'))
    }
    if (!password) {
        return next(new Error('Body must have a password for register'))
    }
    user.register(req.body)
    .then(r => res.cookie("userId", r[0]).send(r[1]))
    .catch(next)
})

server.get('/:id/orders', (req,res,next)=>{
    const { id } = req.params;
    if(!id){
        return res.status(400).send('I need an id to Delete the User')
    }
    user.search(id)
    .then(r => res.send(r))
    .catch(next);     
})

server.get('/', (req, res, next) => {
    user.read(req.body)
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

server.get('/all', (req, res, next) => {
    user.allUsers()
    .then(r => res.send(r))
    .catch(next);
}) 

module.exports = server;