import User from '../models/user';

export default (username, password, cb) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return cb(err);
    }
    if (!user) {
      return cb(null, false, { message: 'User not found' });
    }
    return user.comparePassword(password, (usererr, isMatch) => {
      if (isMatch) {
        return cb(null, user);
      }
      return cb(null, false, { message: 'Invalid username or password' });
    });
  });
};

// passport.use(new LocalStrategy((username, password, cb) => {
//   User.findOne({ username }, (err, user) => {
//     if (err) {
//       return cb(err);
//     }
//     if (!user) {
//       return cb(null, false, { message: 'User not found' });
//     }
//     return user.comparePassword(password, (usererr, isMatch) => {
//       if (isMatch) {
//         return cb(null, user);
//       }
//       return cb(null, false, { message: 'Invalid username or password' });
//     });
//   });
// }));
