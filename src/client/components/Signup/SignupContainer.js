import { connect } from 'react-redux';
import { compose, withProps, mapProps } from 'recompose';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import Signup from './Signup';
import { signUp } from '../../data/actions/user';
import configFormik from '../../helpers/configFormik';

const handleSubmitForm = func => event => {
  console.log(func);
  event.preventDefault();
  func();
};

const handleKeyPress = func => event => {
  if (event.key === 'Enter') {
    func(event);
  }
};
export default compose(
  connect(
    null,
    { submitData: (data, history) => signUp(data, history) }
  ),
  withRouter,
  withFormik(configFormik),
  mapProps(({ handleSubmit, submitData, history, ...rest }) => {
    return { handleSubmitForm: handleSubmitForm(handleSubmit), ...rest };
  }),
  withProps(({ handleSubmitForm: onSubmitForm }) => ({
    handleKeyPress: handleKeyPress(onSubmitForm)
  }))
)(Signup);
