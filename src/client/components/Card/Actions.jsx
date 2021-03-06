import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import styles from './CardStyles';

const useStyles = makeStyles(styles);

function CardActions({ style, className, children, ...props }) {
  const classes = useStyles();

  return (
    <div
      className={`${classes.actions} ${className}`}
      style={{ ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export default CardActions;

CardActions.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({})
};

CardActions.defaultProps = {
  className: '',
  style: {}
};
