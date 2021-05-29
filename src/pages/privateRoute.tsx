import React, { FC, Suspense } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import RoutesString from './routesString';
import PageNotFound from './error/PageNotFound';
import LoggedInLayout from '../components/layout/LoggedInLayout/LoggedInLayout';
import Spinner from '../components/spinner/Spinner';

interface IProps {
  component: any;
  path: string;
  exact?: boolean;
  pageName?: string;
  location?: Location;
  title?: string;
}

const isIncludePrivateRoute = (path: string | undefined) => {
  return Object.keys(RoutesString).some((item) => {
    return RoutesString[item] === path;
  });
};

const renderRoute = (Component: FC) => (props: RouteProps) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );
};

const PrivateRoute: FC<IProps & RouteProps> = ({ component, path, ...rest }) => {
  const isLoggedIn = localStorage.getItem('auth');
  const isIncluded = isIncludePrivateRoute(path);

  if (!isIncluded) return <PageNotFound />;

  if (!isLoggedIn) {
    return (
      <Redirect
        to={{
          pathname: RoutesString.Login,
          state: { from: rest.location?.pathname },
        }}
      />
    );
  }

  return (
    <LoggedInLayout>
      <Route {...rest} render={renderRoute(component)} />
    </LoggedInLayout>
  );
};

export default PrivateRoute;
