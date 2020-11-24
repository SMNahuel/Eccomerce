const server = require('express').Router();
const passport = require('passport');

server.get('/facebook', passport.authenticate('facebook', {scope: ['email'], display: 'popup'}));
server.get('/facebook/redirect', passport.authenticate('facebook', {successRedirect: 'http://localhost:3000/oauth/success'})
);
module.exports = server;