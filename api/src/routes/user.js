const server = require('express').Router();
const user = require('../controllers/user');
const { forAdmin } = require('../middlewares/authenticate')

// Ruta que te devuelve todos los usuarios
server.get('/', forAdmin, (req, res, next) => {
    user.read()
    .then(r => res.send(r))
})
// Ruta que permite promocionar a un usuario a admin
server.put('/promote', forAdmin, (req, res, next) => {
    const { id } = req.body;
    if(!id){

        return res.status(400).send('an id is needed to promote a user')
    }
    user.setAdmin(id)
    .then(r => res.send(r))
    .catch(next)
})
// Ruta que permite demotear a un usuario a guest
server.put('/demote', forAdmin, (req, res, next) => {
    const { id } = req.body;
    if(!id){
        return res.status(400).send('an id is needed to demote a user')
    }
    user.setGuest(id)
    .then(r => res.send(r))
    .catch(next)
})
// Ruta que permite banear a un usuario
server.put('/ban', forAdmin, (req, res, next) => {
    const { id } = req.body;
    if(!id){
        return res.status(400).send('an id is needed to ban a user')
    }
    user.ban(id)
    .then(r => res.send(r))
    .catch(next)
})
//Ruta que permite consultar usuario por email
server.post('/email', (req, res, next) =>{
    const {email} = req.body;
    if(!email){
        return res.status(400).send('an email is need');
    }
    user.userByEmail(email)
    .then(r => res.send(r))
    .catch(next)
})


module.exports = server;