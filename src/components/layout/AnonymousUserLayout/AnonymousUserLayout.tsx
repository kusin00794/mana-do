import React, { FC } from 'react';

import '../../../styles/common.scss';

const AnonymousUserLayout: FC = ({ children }) => {
  return <div className="layout logged-in-layout">{children}</div>;
};

export default AnonymousUserLayout;
