import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Switch, withRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { connect } from 'react-redux';
import { saveReturnTo } from './data/actions/url';
import LoginDialog from './components/LoginDialog';
import MessageDialog from './components/MessageDialog';
import VisitorsListDialog from './components/VisitorsListDialog';

class Root extends Component {
  constructor(props) {
    super(props);
    this.approvedReturnPath = ['places'];
    const { dispatch, history } = props;
    const { location } = history;
    const { pathname, search } = location;
    for (let i = 0; i < this.approvedReturnPath.length; i++) {
      if (pathname === `/${this.approvedReturnPath[i]}`) {
        dispatch(saveReturnTo(`${pathname}${search}`));
        break;
      }
    }
  }

  componentDidMount = () => {
    const { dispatch, history } = this.props;
    this.unlisten = history.listen(location => {
      const { pathname, search } = location;
      for (let i = 0; i < this.approvedReturnPath.length; i++) {
        if (pathname === `/${this.approvedReturnPath[i]}`) {
          dispatch(saveReturnTo(`${pathname}${search}`));
          break;
        }
      }
    });

    const canHover = !matchMedia('(hover: none)').matches;
    if (canHover) {
      document.body.classList.add('can-hover');
    }
    // if (
    //   history.location.pathname !== '/places' &&
    //   history.location.pathname !== '/return-from-success-login'
    // ) {
    //   dispatch(fetchUserData());
    // }
  };

  componentWillUnmount = () => {
    this.unlisten();
  };

  render() {
    const { route } = this.props;
    return (
      <Fragment>
        <Switch>{renderRoutes(route.routes)}</Switch>
        <LoginDialog />
        <MessageDialog />
        <VisitorsListDialog />
      </Fragment>
    );
  }
}

export default withRouter(
  connect(({ reducer }) => {
    return { userId: reducer.user.userId };
  })(Root)
);

Root.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      search: PropTypes.string.isRequired
    }).isRequired,
    listen: PropTypes.func.isRequired
  }).isRequired,
  route: PropTypes.shape({
    routes: PropTypes.array.isRequired
  }).isRequired
};
