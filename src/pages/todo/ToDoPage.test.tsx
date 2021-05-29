import { testSnapshots } from '../../utils/test';
import ToDoPage from './ToDoPage';

describe('<ToDoPage />', () => {
  testSnapshots(ToDoPage, [
    {
      props: {},
      description: 'default render',
    },
  ]);
});
