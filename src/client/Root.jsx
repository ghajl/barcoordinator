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
  componentDidMount = () => {
    const approvedReturnPath = ['places'];
    const { dispatch, history } = this.props;
    console.log(history);
    this.unlisten = history.listen(location => {
      const { pathname, search } = location;
      for (let i = 0; i < approvedReturnPath.length; i++) {
        if (pathname === `/${approvedReturnPath[i]}`) {
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
  history: PropTypes.shape({}).isRequired
};
