import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import LoggedInLayout from './LoggedInLayout';
import { testSnapshots } from '../../../utils/test';

const Wrapper = () => (
  <BrowserRouter>
    <LoggedInLayout>
      <div>Mocked Component</div>
    </LoggedInLayout>
  </BrowserRouter>
);

describe('Snapshot for LoggedInLayout', () => {
  testSnapshots(Wrapper, [
    {
      props: {},
      description: 'render LoggedInLayout',
    },
  ]);
});
