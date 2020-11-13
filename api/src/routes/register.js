const  {User} = require('../db.js')
const express = require('express');
const morgan = require('morgan');
const server = require('express').Router();
const app = express();

const admins = [
    {
        id: 1,
        name: "Maico",
        email: "maicoloncomilla@gmail.com",
        password: "1234567"
    },
    {
        id: 2,
        name: "Javier",
        email: "javierbalonga@gmail.com",
        password: "1234567"
    },
    {
        id: 3,
        name: "Esteban",
        email: "ces.esteban@gmail.com",
        password: "1234567"
    },
    {
        id: 4,
        name: "Leo",
        email: "vinasleonardo@yahoo.com",
        password: "1234567"
    },
    {
        id: 5,
        name: "Nahuel",
        email: "nahuelsan96@gmail.com",
        password: "1234567"
    },
    {
        id: 6,
        name: "Nacho",
        email: "ignaciogimenez70@gmail.com",
        password: "1234567"
    }
]
const users = [
    {
        id: 1,
        name: "Test",
        email: "test@gmail.com",
        password: "1234567"
    }
]

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded());

const cookieparser = require('cookie-parser');
server.use(cookieparser());

server.use( (req, res, next) => {
    console.log(req.cookies);
    next();
})

const isAuthenticated = (req, res, next) => {
    if(!req.cookies.userId && !admins.find(a => a.id === req.cookies.userId) && !users.find(u => u.id === req.cookies.userId)){
        res.redirect('./login');
        return;
    }
    next();
}
const isNotAuthenticated = (req, res,next) => {
    if(req.cookies.userId || users.find(u => u.id === req.cookies.userId)){
        res.redirect('/home');
        return;
    }
    next();
}
server.get('/login', (req, res) => {
    return User.findAll({
        attributes: ["email", "password"],
        order: ["id"]
    })
    .then(r => res.send(r))
    .catch(err => "Error!!!" + err)
    
})

server.post('/login', (req, res) => {
    const { email, password } = req.body;
    if(email && password){
        let user = users.find(u => u.email === email && u.password === password);
        let admin = admins.find(a => a.email === email && a.password === password);
        if(user){
            res.cookie('userId', user.id)
            .redirect('/')
            return;
        }
        if(admin){
            res.cookie('userId', admin.id)
            .redirect('/')
            return;
        }
    }
    res.redirect('/login')
})

module.exports = server;