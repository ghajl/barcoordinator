import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import styles from './CardStyles';

const useStyles = makeStyles(styles);

function CardContent({ style, className, children, ...props }) {
  const classes = useStyles();
  return (
    <div
      className={`${classes.content} ${className}`}
      style={{ ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export default CardContent;

CardContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({})
};

CardContent.defaultProps = {
  className: '',
  style: {}
};
