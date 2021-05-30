import React, { FC } from 'react';

import './Spinner.scss';

const Spinner: FC = () => {
  return (
    <div className="spinner-loading-wrapper">
      <div className="loader">Loading...</div>
    </div>
  );
};

export default Spinner;
