import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Signup from '../pages/Signup';
import Places from '../pages/Places';

const SignupRoute = ({ authenticated }) => {
  console.log(authenticated);
  return authenticated ? <Places /> : <Signup />;
};

export default connect(({ reducer }) => ({
  authenticated: reducer.user.authenticated
}))(SignupRoute);

SignupRoute.propTypes = {
  authenticated: PropTypes.bool.isRequired
};
