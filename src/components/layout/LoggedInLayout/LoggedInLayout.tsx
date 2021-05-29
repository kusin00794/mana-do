import React, { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';

import SideBar from '../../sideBar/sideBar';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';

import RoutesString from '../../../pages/routesString';

import '../../../styles/common.scss';
import './LoggedInLayout.scss';

type UserInfo = {
  userId: string;
};

const LoggedInLayout: FC = ({ children }) => {
  const history = useHistory();
  const defaultUserInfo: UserInfo = {
    userId: 'User',
  };
  const auth = localStorage.getItem('auth');
  const userInfo = auth ? JSON.parse(auth) : defaultUserInfo;
  const userName = userInfo.userId ?? 'User';

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    localStorage.removeItem('auth');
    return history.push(RoutesString.Login);
  };

  return (
    <div className="layout logged-in-layout">
      <SideBar />
      <div className="wrap">
        <div className="navbar">
          <nav>
            <Breadcrumb />
            <ul className="nav ml-auto">
              <li className="nav-item">
                Welcome
                <strong className="ml-1">{userName}</strong>,
              </li>
              <li className="nav-item">
                <Link className="nav-text" to="/" onClick={handleLogout}>
                  <i className="fa fa-power-off" />
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default LoggedInLayout;
