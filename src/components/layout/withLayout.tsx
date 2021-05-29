import React, { FC } from 'react';
import { RouteProps } from 'react-router-dom';

const withLayout = (Layout: FC, Component: FC) => (props: RouteProps) => {
  return (
    <Layout>
      <Component {...props} />
    </Layout>
  );
};

export default withLayout;
