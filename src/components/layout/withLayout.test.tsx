import React, { FC } from 'react';
import withLayout from './withLayout';
import { testSnapshots } from '../../utils/test';

const MockLayout: FC = ({ children }) => <div>{children}</div>;
const MockComponent: FC = () => <div>Mocked Component</div>;

describe('Snapshot for withLayout', () => {
  testSnapshots(withLayout(MockLayout, MockComponent), [
    {
      props: {},
      description: 'render withLayout',
    },
  ]);
});
