import User from '../models/user';

export default (accessToken, refreshToken, profile, cb) => {
  User.findOne({ facebookId: profile.id }, (err, user) => {
    if (err) {
      console.log(err);
      return cb(err);
    }
    if (user) {
      return cb(null, user);
    }
    const newUser = new User();
    newUser.facebookId = profile.id;
    newUser.profile.givenName = (profile.name && profile.name.givenName) || '';
    newUser.profile.familyName =
      (profile.name && profile.name.familyName) || '';
    return newUser.save(usererr => {
      console.log(usererr);
      cb(usererr, newUser);
    });
  });
};
