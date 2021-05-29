import React from 'react';
import { Link } from 'react-router-dom';

import RoutesString from '../../pages/routesString';

const Breadcrumb = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link to={RoutesString.Welcome} className="nav-text">
          <i className="fa fa-home" />
        </Link>
      </li>
    </ul>
  );
};

export default Breadcrumb;
