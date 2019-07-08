import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = {
  container: {
    position: 'relative',
    minWidth: 100,
    minHeight: 100,
    background: '#333'
  },
  image: {
    objectFit: 'contain',
    display: 'none',
    maxWidth: '100%',
    padding: '3px',
    boxShadow: '10px 10px 3px #000',
    border: '1px solid #ddd',
    borderRadius: '3px'
  },
  progress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
};

class CardImage extends PureComponent {
  state = {
    loading: true
  };

  onLoad = () => {
    this.setState({ loading: false });
  };

  render() {
    const { classes, style, className, src, alt, ...props } = this.props;
    const { loading } = this.state;
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
          onLoad={this.onLoad}
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
}

export default withStyles(styles)(CardImage);

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
