import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import Header from './Header';
import { logOut, closeBasket, showBasket } from '../../data/actions/user';
import {
  toSignUp,
  openLoginDialog,
  openLoginMenu,
  closeLoginMenu
} from '../../data/actions/ui';

class HeaderContainer extends Component {
  state = {
    menuAnchorEl: null,
    basketAnchorEl: null
  };

  handleMenuOpen = event => {
    const { openLoginMenu } = this.props;
    event.preventDefault();
    this.setState({ menuAnchorEl: event.currentTarget });
    openLoginMenu();
  };

  handleMenuClose = () => {
    const { closeLoginMenu } = this.props;
    this.setState({ menuAnchorEl: null });
    closeLoginMenu();
  };

  handleLogOutClick = event => {
    const { logOut } = this.props;
    event.preventDefault();
    this.handleMenuClose();
    logOut();
  };

  handleLogInClick = event => {
    const { openLoginDialog } = this.props;
    event.preventDefault();
    this.handleMenuClose();
    openLoginDialog();
  };

  handleSignUpClick = event => {
    const { location, toSignUp } = this.props;
    event.preventDefault();
    this.handleMenuClose();
    if (location.pathname !== '/signup') {
      toSignUp(location);
    }
  };

  handleBasketOpen = event => {
    const { showBasket } = this.props;
    event.preventDefault();
    this.setState({ basketAnchorEl: event.currentTarget });
    showBasket();
  };

  handleCloseBasketList = event => {
    const { closeBasket } = this.props;
    event.preventDefault();
    this.setState({ basketAnchorEl: null });
    closeBasket();
  };

  render() {
    const { username, facebookProfile, ...props } = this.props;
    const { menuAnchorEl, basketAnchorEl } = this.state;
    const authenticatedUserName =
      facebookProfile != null && facebookProfile.givenName != null
        ? facebookProfile.givenName
        : username || 'Registered User';
    return (
      <Header
        menuAnchorEl={menuAnchorEl}
        basketAnchorEl={basketAnchorEl}
        handleMenuOpen={this.handleMenuOpen}
        handleMenuClose={this.handleMenuClose}
        handleLogOutClick={this.handleLogOutClick}
        handleLogInClick={this.handleLogInClick}
        handleSignUpClick={this.handleSignUpClick}
        handleBasketOpen={this.handleBasketOpen}
        handleCloseBasketList={this.handleCloseBasketList}
        authenticatedUserName={authenticatedUserName}
        createMenuAnchor={this.createMenuAnchor}
        {...props}
      />
    );
  }
}

const mapStateToProps = ({ reducer }) => ({
  username: reducer.user.username,
  userBarsCount: (reducer.user.bars && reducer.user.bars.length) || 0,
  facebookProfile: reducer.user.facebookProfile,
  isAuthenticated: reducer.user.authenticated,
  loginMenuOpen: reducer.loginMenuOpen,
  basketOpen: reducer.basketDialogOpen,
  basketList: reducer.user.basket
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    {
      logOut,
      toSignUp,
      openLoginDialog,
      openLoginMenu,
      closeLoginMenu,
      closeBasket,
      showBasket
    }
  )
)(HeaderContainer);

HeaderContainer.propTypes = {
  location: PropTypes.shape({}).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  username: PropTypes.string,
  facebookProfile: PropTypes.shape({
    givenName: PropTypes.string
  }),
  loginMenuOpen: PropTypes.bool.isRequired,
  basketOpen: PropTypes.bool.isRequired,
  userBarsCount: PropTypes.number.isRequired,
  basketList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showBasket: PropTypes.func.isRequired,
  closeBasket: PropTypes.func.isRequired,
  openLoginMenu: PropTypes.func.isRequired,
  closeLoginMenu: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  openLoginDialog: PropTypes.func.isRequired,
  toSignUp: PropTypes.func.isRequired
};

HeaderContainer.defaultProps = {
  facebookProfile: {
    givenName: null
  },
  username: ''
};
