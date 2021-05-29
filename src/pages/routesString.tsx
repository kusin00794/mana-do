import { lazy } from 'react';
import { PUBLIC_PAGES, ENTITIES_NAME } from '../constants/enums';

const Login = lazy(() => import('./login/SignInPage'));
const Welcome = lazy(() => import('./welcome/Welcome'));
const ToDo = lazy(() => import('./todo/ToDoPage'));

type RouteString = {
  [key: string]: string;
};

export const Pages = {
  Login,
  Welcome,
  ToDo,
};

const RoutesString: RouteString = {
  Welcome: '/',
  Login: `/${PUBLIC_PAGES.NAME.LOGIN}`,
  ToDo: `/${ENTITIES_NAME.TODO}`,
};

export default RoutesString;
