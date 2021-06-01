import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AnonymousUserLayout from './AnonymousUserLayout';
import { testSnapshots } from '../../../utils/test';

const Wrapper = () => (
  <BrowserRouter>
    <AnonymousUserLayout>
      <div>Mocked Component</div>
    </AnonymousUserLayout>
  </BrowserRouter>
);

describe('Snapshot for AnonymousUserLayout', () => {
  testSnapshots(Wrapper, [
    {
      props: {},
      description: 'render AnonymousUserLayout',
    },
  ]);
});
