import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { HeaderContainer as Header } from '../Header';
import Footer from '../Footer';
import styles from './LayoutStyles';

const Layout = ({ classes, children }) => {
  return (
    <Fragment>
      <Header />
      <main className={classes.content}>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default withStyles(styles)(Layout);

Layout.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired
};
