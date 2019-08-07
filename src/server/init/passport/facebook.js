import { Strategy as FacebookStrategy } from 'passport-facebook';
import { passport as dbPassport } from '../../db';
import { isDebug, apiEndpoint } from '../../../config/app';

let config = null;
// if (isDebug) {
//   config = require('../../config').default;
// }

export default passport => {
  const facebookId =
    process.env.BARCOORDINATOR_FACEBOOK_APP_ID ||
    config.BARCOORDINATOR_FACEBOOK_APP_ID;
  const facebookSecret =
    process.env.FACEBOOK_APP_SECRET || config.FACEBOOK_APP_SECRET;
  passport.use(
    new FacebookStrategy(
      {
        clientID: facebookId,
        clientSecret: facebookSecret,
        callbackURL: `${apiEndpoint}/auth/facebook/callback`,
        profileFields: ['id', 'name']
      },
      dbPassport.facebook
    )
  );
};
