import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import { compose, withProps, mapProps } from 'recompose';
import LoginDialog from './LoginDialog';
import { closeLoginDialog } from '../../data/actions/ui';
import { manualLogin } from '../../data/actions/user';
import configFormik from '../../helpers/configFormik';

export default compose(
  connect(
    ({ reducer }) => ({
      open: reducer.loginDialogOpen
    }),
    {
      submitData: (data, history) => manualLogin(data, history),
      handleClose: () => closeLoginDialog()
    }
  ),
  withRouter,
  withFormik(configFormik),
  mapProps(({ handleSubmit, submitData, handleClose, history, ...rest }) => ({
    handleSubmitForm: event => {
      event.preventDefault();
      handleSubmit();
    },
    toSignUp: () => {
      handleClose();
      history.push({ pathname: '/signup' });
    },
    handleClose,
    ...rest
  })),
  withProps(({ handleSubmitForm: onSubmitForm }) => ({
    handleKeyPress: event => {
      if (event.key === 'Enter') {
        onSubmitForm(event);
      }
    }
  }))
)(LoginDialog);
