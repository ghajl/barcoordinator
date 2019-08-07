import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './CardStyles';

const useStyles = makeStyles(styles);

function CardImage({ style, className, src, alt, ...props }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);

  const onLoad = () => {
    setLoading(false);
  };

  const containerStyle = loading
    ? {}
    : {
        minWidth: 0,
        minHeight: 0
      };
  const imageStyle = loading
    ? {}
    : {
        display: 'block'
      };

  return (
    <div className={classes.container} style={containerStyle}>
      <img
        className={`${classes.image} ${className}`}
        style={{ ...style, ...imageStyle }}
        src={src}
        alt={alt}
        onLoad={onLoad}
        {...props}
      />
      {!!loading && (
        <div className={classes.progress}>
          <CircularProgress size={30} />
        </div>
      )}
    </div>
  );
}

export default CardImage;

CardImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
  classes: PropTypes.shape({}),
  style: PropTypes.shape({})
};

CardImage.defaultProps = {
  className: '',
  classes: {},
  style: {},
  alt: "Bar's image"
};
