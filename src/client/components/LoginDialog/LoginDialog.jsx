import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/styles';
import { LoginFbContainer as LoginFb } from '../LoginFb';
import styles from './LoginDialogStyles';

function LoginDialog({
  open,
  handleChange,
  handleSubmitForm,
  handleKeyPress,
  handleClose,
  toSignUp,
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
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Log in</DialogTitle>
        <DialogContent>
          <form>
            <TextField
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
              fullWidth
            />
            <TextField
              required
              error={errors.password}
              id="password"
              label="Password"
              type="password"
              helperText={errors.password}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              margin="normal"
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmitForm} color="primary">
            Log in
          </Button>
          <Button onClick={() => toSignUp()} color="primary">
            Or, sign up
          </Button>
          <Button onClick={handleClose} color="primary">
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

export default LoginDialog;

LoginDialog.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmitForm: PropTypes.func.isRequired,
  handleKeyPress: PropTypes.func.isRequired,
  errors: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  location: PropTypes.shape({}).isRequired
};
