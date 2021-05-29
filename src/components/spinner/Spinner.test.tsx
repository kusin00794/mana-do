import { testSnapshots } from '../../utils/test';
import Spinner from './Spinner';

describe('<Spinner />', () => {
  testSnapshots(Spinner, [
    {
      props: {},
      description: 'default render',
    },
  ]);
});
