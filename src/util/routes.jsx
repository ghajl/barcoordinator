import React from 'react';
import { Redirect } from 'react-router-dom';
import SignupRoute from '../client/routes/SignupRoute';
import Places from '../client/pages/Places';
import LoginSuccessRoute from '../client/routes/LoginSuccessRoute';
import NotFound from '../client/components/NotFound';
import Root from '../client/Root';
import { defaultLocation } from './locations';

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: () => (
          <Redirect to={`/places?loc=${defaultLocation.address}&bar=show`} />
        )
      },
      {
        path: '/places',
        component: Places,
        exact: true
      },
      {
        path: '/signup',
        component: SignupRoute,
        exact: true
      },
      {
        path: '/return-from-success-login',
        component: LoginSuccessRoute,
        exact: true
      },
      {
        component: NotFound
      }
    ]
  }
];

export default routes;
