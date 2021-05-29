import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import RoutesString from '../../pages/routesString';

import './sideBar.scss';

const Sidebar = () => {
  const { pathname } = useLocation();
  // will implement for sub menu
  const mockedMenu = [
    {
      path: RoutesString.Welcome,
      name: 'Home',
    },
    {
      path: RoutesString.ToDo,
      name: 'To Do',
    },
  ];

  return (
    <div className="sidebar-fluid">
      <div className="sidebar">
        <h3 className="sidebar-title text-center">Menu</h3>
        <div className="sidebar-section">
          <ul className="sidebar-menu">
            {mockedMenu.map((item, index) => {
              return (
                <li className="sidebar-menu-entry" key={`${item.name}-${index}`}>
                  <Link className={`sidebar-menu-entry-link${pathname === item.path ? ' active' : ''}`} to={item.path}>
                    <span>{item.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
