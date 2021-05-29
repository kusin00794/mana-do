import { testSnapshots } from '../../utils/test';
import SignInPage from './SignInPage';

describe('<SignInPage />', () => {
  testSnapshots(SignInPage, [
    {
      props: {},
      description: 'default render',
    },
  ]);
});
