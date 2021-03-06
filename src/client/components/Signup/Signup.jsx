import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import { LoginFbContainer as LoginFb } from '../LoginFb';
import Layout from '../Layout';
import styles from './SignupStyles';

function Signup({
  location,
  handleChange,
  handleSubmitForm,
  handleKeyPress,
  errors
}) {
  const classes = makeStyles(styles)();

  const usernameInput = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      usernameInput.current.focus();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Layout location={location}>
      <div className={classes.root}>
        <div className={classes.container}>
          <form className={classes.form}>
            <TextField
              className={classes.textField}
              required
              inputRef={usernameInput}
              error={errors.username}
              id="username"
              label="Username"
              type="username"
              helperText={errors.username}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
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
              onKeyPress={handleKeyPress}
              margin="normal"
            />
          </form>
          <div className={classes.button}>
            <Button
              variant="contained"
              onClick={handleSubmitForm}
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

export default Signup;

Signup.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.shape({}).isRequired
};
