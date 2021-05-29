import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/common.scss';

const PageNotFound = () => {
  return (
    <div className="layout">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">Page Not Found</h1>
        </div>
        <div className="col-12">
          <div className="text-center">
            <Link to="/" className="text-decoration-none">
              <i className="fa fa-angle-left mr-2" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
