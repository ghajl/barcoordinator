import { connect } from 'react-redux';
import { compose, withProps, mapProps } from 'recompose';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import Signup from './Signup';
import { signUp } from '../../data/actions/user';
import configFormik from '../../helpers/configFormik';

export default compose(
  connect(
    null,
    { submitData: (data, history) => signUp(data, history) }
  ),
  withRouter,
  withFormik(configFormik),
  mapProps(({ handleSubmit, submitData, history, ...rest }) => ({
    handleSubmitForm: event => {
      event.preventDefault();
      handleSubmit();
    },
    ...rest
  })),
  withProps(({ handleSubmitForm: onSubmitForm }) => ({
    handleKeyPress: event => {
      if (event.key === 'Enter') {
        onSubmitForm(event);
      }
    }
  }))
)(Signup);
