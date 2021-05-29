import React, { FC, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import withLayout from '../components/layout/withLayout';
import ErrorBoundary from '../components/ErrorBoundary';
import PageNotFound from './error/PageNotFound';
import Spinner from '../components/spinner/Spinner';
import RoutesString, { Pages } from './routesString';
import PrivateRoute from './privateRoute';
import { API_ENTITIES_NAME, PUBLIC_PAGES, TITLE_PAGE } from '../constants/enums';
import AnonymousUserLayout from '../components/layout/AnonymousUserLayout/AnonymousUserLayout';

const Routes: FC = (): JSX.Element => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Switch>
          <Route
            path={RoutesString.Login}
            exact={true}
            component={withLayout(AnonymousUserLayout, () => (
              <Suspense fallback={<Spinner />}>
                <Pages.Login />
              </Suspense>
            ))}
          />
          <PrivateRoute
            title={TITLE_PAGE.WELCOME}
            path={RoutesString.Welcome}
            exact={true}
            component={Pages.Welcome}
            pageName={PUBLIC_PAGES.NAME.WELCOME}
          />
          <PrivateRoute
            title={TITLE_PAGE.TODO}
            path={RoutesString.ToDo}
            exact={true}
            component={Pages.ToDo}
            pageName={API_ENTITIES_NAME.TODO}
          />
          <Route key={'page-not-found'} path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
