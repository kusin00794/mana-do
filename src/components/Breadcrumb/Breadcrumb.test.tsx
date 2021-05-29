import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { testSnapshots } from '../../utils/test';
import Breadcrumb from './Breadcrumb';

const Wrapper = (props: any) => (
  <BrowserRouter>
    <Breadcrumb {...props} />
  </BrowserRouter>
);
describe('Breadcrumb Page', () => {
  testSnapshots(Wrapper, [
    {
      props: {},
      description: 'render Breadcrumb Page',
    },
  ]);
});
