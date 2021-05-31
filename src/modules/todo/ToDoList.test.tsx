import React from 'react';
import { shallow, mount } from 'enzyme';

import ToDoList from './ToDoList';
import { testSnapshots } from '../../utils/test';
import { TodoStatus, Todo } from '../../models/todo';

const mockedToDoList: Array<Todo> = [
  {
    content: 'Wake up',
    created_date: '2021-05-30T14:46:10.886Z',
    status: TodoStatus.ACTIVE,
    id: 'XhzigAlSx',
    user_id: 'firstUser',
  },
  {
    content: 'Brush Teeth, wash face',
    created_date: '2021-05-30T14:46:09.942Z',
    status: TodoStatus.ACTIVE,
    id: 'tIAk5RcDKM',
    user_id: 'firstUser',
  },
  {
    content: 'Have breakfast',
    created_date: '2021-05-30T14:46:09.150Z',
    status: TodoStatus.ACTIVE,
    id: 'eVH_2u1QI',
    user_id: 'firstUser',
  },
  {
    content: 'Open Laptop',
    created_date: '2021-05-30T14:46:08.382Z',
    status: TodoStatus.ACTIVE,
    id: 'xxiRAVSyh',
    user_id: 'firstUser',
  },
  {
    content: 'Meeting',
    created_date: '2021-05-30T14:46:07.670Z',
    status: TodoStatus.ACTIVE,
    id: 'cmOwCmuwJ',
    user_id: 'firstUser',
  },
  {
    content: 'Doing task',
    created_date: '2021-05-30T14:46:06.590Z',
    status: TodoStatus.ACTIVE,
    id: 'zPFJoicuQ',
    user_id: 'firstUser',
  },
];

const defaultProps = {
  showingStatus: TodoStatus.ACTIVE,
  showTodos: mockedToDoList,
  onUpdateTodoStatus: jest.fn(),
  onDeleteTodo: jest.fn(),
  onUpdateToDo: jest.fn(),
};

describe('<ToDoList />', () => {
  testSnapshots(ToDoList, [
    {
      props: {},
      description: 'default render',
    },
  ]);
});

describe('ToDoList logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.resetModules();
  });

  test('Should set completed when click into active item checkbox', async () => {
    const wrapper = shallow(<ToDoList {...defaultProps} />);
    const firstItemCheckBox = wrapper.find('.ToDo__item input[type="checkbox"]').first();
    firstItemCheckBox.simulate('change', {
      target: {
        checked: true,
      },
    });

    expect(defaultProps.onUpdateTodoStatus).toHaveBeenCalledWith(true, mockedToDoList[0].id);
  });

  test('Should call onDeleteTodo when click into delete button', async () => {
    const wrapper = shallow(<ToDoList {...defaultProps} />);
    const firstItemDelete = wrapper.find('.ToDo__item button').first();
    firstItemDelete.simulate('click');

    expect(defaultProps.onDeleteTodo).toHaveBeenCalledWith(mockedToDoList[0].id);
  });

  test('Should toggle input for user can edit item and not update item when user enter and input empty', async () => {
    const wrapper = mount(<ToDoList {...defaultProps} />);
    const firstItem = wrapper.find('.ToDo__item span').first();

    firstItem.simulate('doubleClick');
    wrapper.update();

    const firstItemEdit = wrapper.find('.ToDo__item input[type="text"]').first();
    firstItemEdit.simulate('change', {
      target: {
        value: '',
      },
    });
    firstItemEdit.simulate('keydown', { key: 'Enter' });

    expect(defaultProps.onUpdateToDo).not.toHaveBeenCalled();
  });

  test('Should toggle input for user can edit item then update Item when user enter and input have value', async () => {
    const wrapper = mount(<ToDoList {...defaultProps} />);
    const expectedValue = {
      content: 'edited - todo',
      todoId: mockedToDoList[0].id,
    };
    const firstItem = wrapper.find('.ToDo__item span').first();

    firstItem.simulate('doubleClick');
    wrapper.update();

    const firstItemEdit = wrapper.find('.ToDo__item input[type="text"]').first();
    firstItemEdit.simulate('change', {
      target: {
        value: expectedValue.content,
      },
    });
    firstItemEdit.simulate('keydown', { key: 'Enter' });

    expect(defaultProps.onUpdateToDo).toHaveBeenCalledWith(expectedValue);
  });
});
