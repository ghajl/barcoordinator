import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import styles from './CardStyles';

const useStyles = makeStyles(styles);

function Card({ style, className, children, src, ...props }) {
  const classes = useStyles();
  const imgStyle = src
    ? {
        backgroundImage: `url(${src})`,
        backgroundColor: 'gray',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        paddingTop: '15rem'
      }
    : {};
  return (
    <div
      className={`${classes.card} ${className}`}
      style={{ ...imgStyle, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;

Card.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.shape({}),
  src: PropTypes.string,
  id: PropTypes.string.isRequired
};

Card.defaultProps = {
  className: '',
  src: '',
  style: {}
};
