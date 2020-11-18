const server = require('express').Router();
const user = require('../controllers/user');
const {forAdmin} = require('../middlewares/authenticate')

//Restore password
server.put('/password/:id', (req, res, next) => {
    const id = req.cookies.userId;
    const { password }= req.body;
    const  idUser = req.params.id;
    if(idUser !== id){
        return res.status(400).send('Security error cookies invalid')
    }
    if(!id){
        return res.status(400).send('I need an id to modify the User')
    }
    if(!password){
        return res.status(400).send('I need an password to modify the User')
    }
    
    user.resetPassword(id, password)
    .then(r => res.send(r))
    .catch(next)
})
// Ruta que permite logearse
server.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        return res.status(400).send('Body must have a email for login')
    }
    if (!password) {
        return res.status(400).send('Body must have a password for login')
    }
    user.login(req.body)
    .then(r => res.cookie("userId", r[0]).send(r[1]))
    .catch(next)
})

// Ruta que permite registrarse
server.post('/register', (req, res, next) => {
    const { email, name, password} = req.body;
    if (!email) {
        return res.status(400).send('Body must have a email for register')
    }
    if (!name) {
        return res.status(400).send('Body must have a name for register')
    }
    if (!password) {
        return res.status(400).send('Body must have a password for register')
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
        return res.status(400).send('User is not logedIn');
    }
    res.cookie("userId", "", {expires: new Date(0)}).send({})
})

// Ruta que te devuelve todos los usuarios
server.get('/admin', forAdmin, (req, res, next) => {
    user.read()
    .then(r => res.send())
})

// Ruta que permite promocionar a un usuario a admin
server.put('/admin/promote', forAdmin, (req, res, next) => {
    const { id } = req.body;
    if(!id){
        return res.status(400).send('an id is needed to promote a user')
    }
    user.promote(id)
    .then(r => res.send(r))
    .catch(next)
})

// Ruta que permite demotear a un usuario a guest
server.put('/admin/demote', forAdmin, (req, res, next) => {
    const { id } = req.body;
    if(!id){
        return res.status(400).send('an id is needed to demote a user')
    }
    user.demote(id)
    .then(r => res.send(r))
    .catch(next)
})

server.put('/admin/ban', forAdmin, (req, res, next) => {
    const { id } = req.body;
    if(!id){
        return res.status(400).send('an id is needed to ban a user')
    }
    user.ban(id)
    .then(r => res.send(r))
    .catch(next)
})

module.exports = server;