const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const session = require('express-session');
const { passport } = require('./middlewares/passport');

require('./db.js');

const server = express();

server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONT_URL);
	res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
var sess = {
  secret: process.env.PASSPORT_SECRET,
  resave: false,
  saveUninitialized: true
}
if (server.get('env') === 'production') {
  server.set('trust proxy', 1)
  sess.cookie = { secure: true, sameSite: 'none' }
}
server.use(session(sess));
server.use(passport.initialize());
server.use(passport.session());

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { 
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
