import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import { compose } from 'recompose';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core/styles';
import { LoginFbContainer as LoginFb } from '../LoginFb';
import {
  closeLoginDialog,
  openLoginDialog,
  toSignUp
} from '../../data/actions/ui';
import { manualLogin } from '../../data/actions/user';
import getErrorMessages from '../../helpers/InputCheck';

const styles = {
  fbLogin: {
    backgroundColor: '#F8F8F8',
    textAlign: 'center'
  }
};

class LoginDialogContainer extends Component {
  constructor() {
    super();
    this.usernameInput = null;
    this.passwordInput = null;
    this.state = {
      usernameErrorText: '',
      passwordErrorText: ''
    };
  }

  handleClickOpen = () => {
    const { dispatch } = this.props;
    dispatch(openLoginDialog());
  };

  handleSubmitLogin = data => {
    const username = (data && data.username) || '';
    const password = (data && data.password) || '';
    const { dispatch, history } = this.props;
    const { usernameError, passwordError } = getErrorMessages(
      username,
      password
    );
    if (usernameError || passwordError) {
      this.setState({
        usernameErrorText: usernameError,
        passwordErrorText: passwordError
      });
    } else {
      this.setState({ usernameErrorText: '', passwordErrorText: '' });
      dispatch(
        manualLogin(
          {
            username,
            password
          },
          history
        )
      );
    }
  };

  goToSignUp = () => {
    const { dispatch, history } = this.props;
    dispatch(closeLoginDialog());
    history.push({ pathname: '/signup' });
  };

  handleCloseLogin = () => {
    const { dispatch } = this.props;
    this.setState({ usernameErrorText: '', passwordErrorText: '' });
    dispatch(closeLoginDialog());
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.submit(event);
    }
  };

  submit = event => {
    event.preventDefault();
    const data = {
      username: this.usernameInput.value,
      password: this.passwordInput.value
    };
    this.handleSubmitLogin(data);
  };

  render() {
    const { classes, open } = this.props;
    const { usernameErrorText, passwordErrorText } = this.state;
    return (
      <div>
        <Dialog open={open} onClose={this.handleCloseLogin}>
          <DialogTitle id="form-dialog-title">Log in</DialogTitle>
          <DialogContent>
            <form>
              <TextField
                required
                error={usernameErrorText.length > 0}
                margin="normal"
                id="username"
                label="Username"
                type="username"
                helperText={usernameErrorText}
                inputRef={input => {
                  if (input) {
                    this.usernameInput = input;
                    setTimeout(() => {
                      this.usernameInput.focus();
                    }, 300);
                  }
                }}
                fullWidth
                onKeyPress={this.handleKeyPress}
              />
              <TextField
                required
                error={passwordErrorText.length > 0}
                margin="normal"
                id="password"
                label="Password"
                type="password"
                helperText={passwordErrorText}
                inputRef={input => {
                  this.passwordInput = input;
                }}
                fullWidth
                onKeyPress={this.handleKeyPress}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.submit} color="primary">
              Log in
            </Button>
            <Button onClick={() => this.goToSignUp()} color="primary">
              Or, sign up
            </Button>
            <Button onClick={this.handleCloseLogin} color="primary">
              Cancel
            </Button>
          </DialogActions>
          <div className={classes.fbLogin}>
            <LoginFb />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(({ reducer }) => ({
    open: reducer.loginDialogOpen
  })),
  withStyles(styles)
)(LoginDialogContainer);

LoginDialogContainer.propTypes = {
  classes: PropTypes.shape({
    fbLogin: PropTypes.string.isRequired
  }).isRequired,
  open: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({}).isRequired
};
