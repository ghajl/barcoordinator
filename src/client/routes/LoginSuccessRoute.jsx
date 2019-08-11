import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import qs from 'query-string';
import { compose } from 'recompose';
import { Redirect, withRouter } from 'react-router-dom';
import {
  facebookLoginSuccess,
  facebookLoginAddSuccess,
  facebookLoginAddError
} from '../data/actions/user';

function LoginSuccessRoute({ location, dispatch, returnPath }) {
  console.log('LoginSuccessRoute');
  const loginParams = qs.parse(location.search);
  if (typeof loginParams.addOperation !== 'undefined') {
    dispatch(facebookLoginSuccess());
    if (loginParams.addOperation) {
      if (loginParams.addOperationSuccess) {
        dispatch(facebookLoginAddSuccess());
      } else {
        dispatch(facebookLoginAddError());
      }
    }
  }
  return <Redirect to={returnPath} />;
}

export default compose(
  withRouter,
  connect(({ reducer }) => ({ returnPath: reducer.returnPath }))
)(LoginSuccessRoute);

LoginSuccessRoute.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string
  }),
  dispatch: PropTypes.func.isRequired,
  returnPath: PropTypes.string
};

LoginSuccessRoute.defaultProps = {
  location: {
    search: ''
  },
  returnPath: ''
};
