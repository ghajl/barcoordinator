import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { closeVisitorsList } from '../../data/actions/bar';

const VisitorsListDialogContainer = ({
  visitorsList,
  open,
  dispatch,
  ...props
}) => {
  const handleCloseVisitorsList = () => {
    dispatch(closeVisitorsList());
  };

  return (
    <Dialog open={open} onClose={handleCloseVisitorsList} {...props}>
      <DialogTitle id="going-list">Who is going:</DialogTitle>
      <div>
        <List>
          {visitorsList.map(visitor => (
            <ListItem key={visitor}>
              <ListItemText primary={visitor} />
            </ListItem>
          ))}
        </List>
      </div>
      <DialogActions>
        <Button onClick={handleCloseVisitorsList} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default connect(({ reducer }) => ({
  visitorsList: reducer.bar.visitors,
  open: reducer.listDialogOpen
}))(VisitorsListDialogContainer);

VisitorsListDialogContainer.propTypes = {
  visitorsList: PropTypes.arrayOf(PropTypes.string),
  dispatch: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

VisitorsListDialogContainer.defaultProps = {
  visitorsList: []
};
