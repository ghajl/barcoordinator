import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Clear from '@material-ui/icons/Clear';
import styles from './ItemStyles';

const useStyles = makeStyles(styles);

function Item({ name, address, removeItem }) {
  const classes = useStyles();

  return (
    <div className={classes.item}>
      <div className={classes.itemDetails}>
        <div className={classes.itemName}>{name}</div>
        <div className={classes.itemAddress}>{address}</div>
      </div>
      <div className={classes.itemAction}>
        <IconButton
          className={classes.button}
          aria-label="Remove from list"
          title="Remove from list"
          onClick={removeItem}
        >
          <Clear className={classes.icon} />
        </IconButton>
      </div>
    </div>
  );
}

export default Item;

Item.propTypes = {
  removeItem: PropTypes.func.isRequired,
  name: PropTypes.string,
  address: PropTypes.string
};

Item.defaultProps = {
  name: '',
  address: ''
};
