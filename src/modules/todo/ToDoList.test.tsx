import { testSnapshots } from '../../utils/test';
import ToDoList from './ToDoList';

describe('<ToDoList />', () => {
  testSnapshots(ToDoList, [
    {
      props: {},
      description: 'default render',
    },
  ]);
});
