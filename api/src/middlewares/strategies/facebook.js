const FacebookStrategy = require('passport-facebook').Strategy;
const user = require('../controllers/user');
const { User } = require('../db.js');

//Integramos un passport facebook ya requerido 
//Importamos la plantilla User para hacer uso de sus funciones 
module.exports = new FacebookStrategy(
  {
    //Usamos los codigos necesarios 
    //MEMO: Utilizar un archivos aparte
    //profileFields datos especificos, indicar como array
    clientID: 697586607801620,
    clientSecret: 'e24a4e6fc02a76c25fc6db6470fd5722',
    callbackURL: '/auth/facebook/success',
    profileFields: ['displayName', 'photos', 'emails']
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    user.logingProvider(profile.provider, profile.id, profile.displayName, profile.emails[0].value)
    .then(user => done(null, user))
    .catch(err => done(err, false));
  } 
)

