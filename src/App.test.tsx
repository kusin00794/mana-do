import { testSnapshots } from './utils/test';
import App from './App';

jest.mock('./pages/routes', () => 'Routes');

describe('<App />', () => {
  testSnapshots(App, [
    {
      description: 'render App',
      props: {},
    },
  ]);
});
