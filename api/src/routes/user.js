const server = require('express').Router();
const user = require('../controllers/user');

// Ruta que permite logearse
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

// Ruta que permite registrarse
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

// Ruta que trae los datos del usuario
server.get('/me', (req,res,next)=>{
    const { userId } = req.cookies;
    if (!userId) {
        return res.send({});
    }
    user.getById(userId)
    .then(r => res.send(r))
    .catch(next)
})

// Ruta que permite deslogearse
server.get('/logout', (req,res,next)=>{
    const { userId } = req.cookies;
    if (!userId) {
        return next(new Error('User is not logedIn'));
    }
    res.cookie("userId", "", {expires: new Date(0)}).send({})
})

// no se esta usando
server.post('/', (req, res, next) => {
    const { name, email, password } = req.body

    if(!name || !email || !password){
        return next(new Error('Body must have a name, email and password'))
    }
    user.create(req.body)
    .then(r => res.send())
})

// no se esta usando
server.put('/:id', (req, res, next) => {
    const { id } = req.params;
    if(!id){
        return res.status(400).send('I need an id to modify the User')
    }
    user.update(id, req.body)
    .then(r => res.send(r))
    .catch(next)
})

// no se esta usando
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