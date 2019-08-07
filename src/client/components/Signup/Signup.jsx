import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import getErrorMessages from '../../helpers/InputCheck';
import { LoginFbContainer as LoginFb } from '../LoginFb';
import Layout from '../Layout';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '1 0 auto',
    marginTop: '60px',
    '@media (max-width: 600px)': {
      marginTop: '50px'
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 500,
    maxWidth: '100%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 500,
    maxWidth: '100%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
    maxWidth: '100%'
  },
  menu: {
    width: 200
  },
  button: {
    marginTop: 50
  },
  fbLogin: {
    textAlign: 'center',
    marginTop: 50
  }
});

class Signup extends Component {
  constructor() {
    super();
    this.usernameInput = null;
    this.passwordInput = null;
    this.state = {
      usernameErrorMessage: '',
      passwordErrorMessage: ''
    };
  }

  onSignupSubmit = event => {
    event.preventDefault();
    console.log(this.props);
    const { handleSubmit } = this.props;
    handleSubmit();
    // const username = this.usernameInput.value;
    // const password = this.passwordInput.value;
    // const { usernameError, passwordError } = getErrorMessages(
    //   username,
    //   password
    // );
    // const { signUp } = this.props;
    // if (usernameError || passwordError) {
    //   this.setState({
    //     usernameErrorMessage: usernameError,
    //     passwordErrorMessage: passwordError
    //   });
    // } else {
    //   signUp({ username, password });
    // }
  };

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.onSignupSubmit(event);
    }
  };

  render() {
    const {
      classes,
      location,
      handleChange,
      handleSubmitSignUpForm,
      errors
    } = this.props;
    console.log(this.props);
    const { usernameErrorMessage, passwordErrorMessage } = this.state;
    return (
      <Layout location={location}>
        <div className={classes.root}>
          <div className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmitSignUpForm}>
              <TextField
                className={classes.textField}
                required
                error={errors.username}
                id="username"
                label="Username"
                type="username"
                helperText={errors.username}
                onChange={handleChange}
                margin="normal"
              />
              <TextField
                className={classes.textField}
                required
                error={errors.password}
                id="password"
                label="Password"
                type="password"
                helperText={errors.password}
                onChange={handleChange}
                margin="normal"
              />
            </form>
            <div className={classes.button}>
              <Button
                variant="contained"
                onClick={handleSubmitSignUpForm}
                type="submit"
              >
                sign up
              </Button>
            </div>
            <div className={classes.fbLogin}>
              <LoginFb />
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default withStyles(styles)(Signup);

Signup.propTypes = {
  signUp: PropTypes.func.isRequired,
  classes: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({}).isRequired
};
