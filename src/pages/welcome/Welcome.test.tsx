import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { testSnapshots } from '../../utils/test';
import Welcome from './Welcome';

const Wrapper = (props: any) => (
  <BrowserRouter>
    <Welcome {...props} />
  </BrowserRouter>
);
describe('Welcome Page', () => {
  testSnapshots(Wrapper, [
    {
      props: {},
      description: 'render Welcome Page',
    },
  ]);
});
