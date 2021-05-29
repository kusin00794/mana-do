import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { testSnapshots } from '../../utils/test';
import PageNotFound from './PageNotFound';

const Wrapper = (props: any) => (
  <BrowserRouter>
    <PageNotFound {...props} />
  </BrowserRouter>
);
describe('PageNotFound Page', () => {
  testSnapshots(Wrapper, [
    {
      props: {},
      description: 'render PageNotFound Page',
    },
  ]);
});
