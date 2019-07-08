import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import uuidv1 from 'uuid/v1';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountBox from '@material-ui/icons/AccountBox';
import DirectionsWalk from '@material-ui/icons/DirectionsWalk';
import { makeStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Badge from '@material-ui/core/Badge';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Basket from '../Basket';
import styles from './HeaderStyles';

const Header = ({
  isAuthenticated,
  loginMenuOpen,
  userBarsCount,
  basketList,
  basketOpen,
  menuAnchorEl,
  basketAnchorEl,
  handleMenuOpen,
  handleMenuClose,
  handleLogOutClick,
  handleLogInClick,
  handleSignUpClick,
  handleBasketOpen,
  handleCloseBasketList,
  authenticatedUserName
}) => {
  const classes = makeStyles(styles)();
  return (
    <AppBar className={classes.appBar} id="PageId">
      <Toolbar>
        <Typography
          className={classes.logo}
          component={Link}
          to="/"
          type="title"
        >
          BarCoordinator
        </Typography>
        <div className={classes.menuSmall}>
          <IconButton
            aria-owns={loginMenuOpen ? 'menu-appbar' : null}
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <AccountBox />
          </IconButton>
        </div>
        <div className={classes.menuLarge}>
          {isAuthenticated && (
            <IconButton
              className={classes.basket}
              aria-label="Show my places"
              title="Show my places"
              onClick={handleBasketOpen}
            >
              <Badge
                badgeContent={userBarsCount}
                color="primary"
                classes={{ badge: classes.badge }}
              >
                <DirectionsWalk className={classes.icon} />
              </Badge>
            </IconButton>
          )}
          <div className={classes.text}>
            {`Hello, ${authenticatedUserName} !`}
          </div>
          <div className={classes.login}>
            {isAuthenticated ? (
              <Button
                className={classes.text}
                component={Link}
                to="/logout"
                onClick={handleLogOutClick}
              >
                LOG OUT
              </Button>
            ) : (
              <React.Fragment>
                <Button className={classes.text} onClick={handleLogInClick}>
                  LOG IN
                </Button>
                <Button
                  className={classes.text}
                  component={Link}
                  to="/signup"
                  onClick={handleSignUpClick}
                >
                  SIGN UP
                </Button>
              </React.Fragment>
            )}
          </div>
        </div>

        <Menu
          id="menu-appbar"
          classes={{ paper: classes.popUpMenu }}
          anchorEl={menuAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={loginMenuOpen}
          onClose={handleMenuClose}
        >
          <ListItem className={classes.text}>{authenticatedUserName}</ListItem>
          {isAuthenticated
            ? [
                <MenuItem onClick={handleBasketOpen} key={uuidv1()}>
                  <ListItemIcon
                    className={classes.text}
                    aria-label="Show my places"
                    title="Show my places"
                  >
                    <Badge
                      badgeContent={userBarsCount}
                      color="primary"
                      classes={{ badge: classes.badge }}
                    >
                      <DirectionsWalk />
                    </Badge>
                  </ListItemIcon>
                </MenuItem>,
                <MenuItem
                  className={classes.text}
                  component={Link}
                  to="/logout"
                  onClick={handleLogOutClick}
                  key={uuidv1()}
                >
                  LOG OUT
                </MenuItem>
              ]
            : [
                <MenuItem
                  className={classes.text}
                  onClick={handleLogInClick}
                  key={uuidv1()}
                >
                  LOG IN
                </MenuItem>,
                <MenuItem
                  className={classes.text}
                  component={Link}
                  to="/signup"
                  onClick={handleSignUpClick}
                  key={uuidv1()}
                >
                  SIGN UP
                </MenuItem>
              ]}
        </Menu>
        <Basket
          basketList={basketList}
          open={basketOpen}
          onClose={handleCloseBasketList}
          anchorEl={basketAnchorEl}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

Header.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  facebookProfile: PropTypes.shape({}),
  loginMenuOpen: PropTypes.bool.isRequired,
  basketOpen: PropTypes.bool.isRequired,
  userBarsCount: PropTypes.number.isRequired,
  basketList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  showBasket: PropTypes.func.isRequired,
  menuAnchorEl: PropTypes.shape({}),
  basketAnchorEl: PropTypes.shape({}),
  handleMenuOpen: PropTypes.func.isRequired,
  handleMenuClose: PropTypes.func.isRequired,
  handleLogOutClick: PropTypes.func.isRequired,
  handleLogInClick: PropTypes.func.isRequired,
  handleSignUpClick: PropTypes.func.isRequired,
  handleCloseBasketList: PropTypes.func.isRequired,
  authenticatedUserName: PropTypes.string.isRequired
};

Header.defaultProps = {
  facebookProfile: {},
  menuAnchorEl: null,
  basketAnchorEl: null
};
