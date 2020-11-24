const FacebookStrategy = require('passport-facebook').Strategy;
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
    callbackURL: '/auth/facebook/redirect',
    profileFields: ['displayName', 'photos', 'emails']
  },

  async (accessToken, refreshToken, profile, done) => {
    console.log('vamo a ve que ta trae: ' , profile);
    try{
    const [user, created] = await User.findOrCreate({
        where: {
            provider   : profile.provider,
            providerId : profile.id
        },
        defaults: {
            name: profile.displayName, 
            email: profile.emails[0].value
        }
    
    });
    if (!user) return done(null, false, {message: 'No pudimos loguearte con esa cuenta'});

    // On success
    return done(null, user);
    }catch (error) {
        done(error);
    }
/*       function(err, user) {
      if (err) { return done(err);}
      //Si exite que lo devuelva
      if(!err && user != null) return done(null, user);
      
      let usuario = new User({
          name          : profile.displayName,
          mail          : profile.mail
      });
      usuario.save(function(err){
          if(err) throw err;
          done(null, user);
      }) 
    ); */
  } 
)

