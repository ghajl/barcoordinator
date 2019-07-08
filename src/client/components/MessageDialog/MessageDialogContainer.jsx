import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { withStyles } from '@material-ui/core/styles';
import uuidv1 from 'uuid/v1';
import { closeMessage } from '../../data/actions/ui';

const styles = {
  button: {
    alignSelf: 'center'
  }
};

const MessageDialog = ({ classes, open, message, dispatch }) => {
  const handleCloseMessage = () => {
    dispatch(closeMessage());
  };

  return (
    <Dialog open={open} onClose={handleCloseMessage}>
      <DialogContent>
        {message &&
          message.map(msg => {
            const key = uuidv1();
            return <DialogContentText key={key}>{msg}</DialogContentText>;
          })}
      </DialogContent>
      <DialogActions className={classes.button}>
        <Button raised onClick={handleCloseMessage} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect(({ reducer }) => ({
  message: reducer.user.message,
  open: reducer.messageDialogOpen
}))(withStyles(styles)(MessageDialog));

MessageDialog.propTypes = {
  classes: PropTypes.shape({
    button: PropTypes.string.isRequired
  }).isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.arrayOf(PropTypes.string).isRequired
};
