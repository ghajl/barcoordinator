import local from './local';
import facebook from './facebook';
import { passport as dbPassport } from '../../db';

export default passport => {
  if (dbPassport && dbPassport.deserializeUser) {
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });

    passport.deserializeUser(dbPassport.deserializeUser);
  }

  local(passport);
  facebook(passport);
};

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, (err, user) => {
//     done(err, user);
//   });
// });
