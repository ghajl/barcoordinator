import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './SplitterStyles';

const Splitter = ({ classes, style, className }) => (
  <div className={`${classes.splitter} ${className}`} style={{ ...style }} />
);

export default withStyles(styles)(Splitter);

Splitter.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.shape({}),
  style: PropTypes.shape({})
};

Splitter.defaultProps = {
  className: '',
  classes: {},
  style: {}
};
