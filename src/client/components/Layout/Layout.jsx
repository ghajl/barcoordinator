import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { HeaderContainer as Header } from '../Header';
import Footer from '../Footer';
import styles from './LayoutStyles';

const Layout = ({ classes, children }) => {
  const classes = makeStyles(styles)();
  return (
    <Fragment>
      <Header />
      <main className={classes.content}>{children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;

Layout.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  children: PropTypes.shape({}).isRequired
};
