import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, wait, fireEvent } from '@testing-library/react';

import ToDoForm from './ToDoForm';
import { testSnapshots } from '../../utils/test';
import { TodoStatus, Todo } from '../../models/todo';
import Service from '../../service';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

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
  {
    content: 'Doing task 1',
    created_date: '2021-05-30T14:46:06.590Z',
    status: TodoStatus.ACTIVE,
    id: 'zPFJoicuQ1',
    user_id: 'firstUser',
  },
  {
    content: 'Review PR',
    created_date: '2021-05-30T14:46:06.590Z',
    status: TodoStatus.ACTIVE,
    id: 'zPFJoicuQ2',
    user_id: 'firstUser',
  },
  {
    content: 'Doing task 2',
    created_date: '2021-05-30T14:46:06.590Z',
    status: TodoStatus.ACTIVE,
    id: 'zPFJoicuQ3',
    user_id: 'firstUser',
  },
  {
    content: 'Have lunch',
    created_date: '2021-05-30T14:46:06.590Z',
    status: TodoStatus.ACTIVE,
    id: 'zPFJoicuQ4',
    user_id: 'firstUser',
  },
  {
    content: 'Review PR',
    created_date: '2021-05-30T14:46:06.590Z',
    status: TodoStatus.ACTIVE,
    id: 'zPFJoicuQ5',
    user_id: 'firstUser',
  },
];

const noItemText = 'No to do item with the following status:';

const Wrapper = (props: any) => (
  <BrowserRouter>
    <ToDoForm {...props} />
  </BrowserRouter>
);

describe('<ToDoForm />', () => {
  const setState = jest.fn();
  const useStateMock: any = (initState: any) => [initState, setState];
  jest.spyOn(React, 'useState').mockImplementation(useStateMock);

  testSnapshots(Wrapper, [
    {
      props: {},
      description: 'default render',
    },
  ]);
});

describe('ToDoForm logic', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
    jest.restoreAllMocks();
    jest.resetModules();
    Service.getTodos = jest.fn().mockResolvedValue(mockedToDoList);
  });

  test('Should set correct showing status', async () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const wrapper = render(<Wrapper />);
    const { container } = wrapper;
    const allStatusBtn = container.querySelector('.Action__btn.all');
    const activeStatusBtn = container.querySelector('.Action__btn.active');
    const completedStatusBtn = container.querySelector('.Action__btn.completed');
    await wait(() => {
      allStatusBtn && fireEvent.click(allStatusBtn);
      activeStatusBtn && fireEvent.click(activeStatusBtn);
      completedStatusBtn && fireEvent.click(completedStatusBtn);
    });
    expect(setState).not.toHaveBeenCalledWith(TodoStatus.ALL);
    expect(setState).toHaveBeenCalledWith(TodoStatus.ACTIVE);
    expect(setState).toHaveBeenCalledWith(TodoStatus.COMPLETED);
  });

  test('Should create todo successfully and set showing status is ALL', async () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const newTodo = {
      content: 'add todo',
      created_date: new Date().toISOString(),
      status: TodoStatus.ACTIVE,
      id: 'mockedId-add-todo-123',
      user_id: 'firstUser',
    };
    Service.createTodo = jest.fn().mockResolvedValue(newTodo);
    const wrapper = render(<Wrapper />);
    const { container, getByText } = wrapper;
    const todoInput = container.querySelector('.Todo__input');
    await wait(() => {
      todoInput && fireEvent.change(todoInput, { target: { value: 'add toto' } });
      todoInput && fireEvent.keyDown(todoInput, { key: 'Enter', keyCode: 13 });
    });

    expect(setState).toHaveBeenCalledWith(TodoStatus.ALL);
    expect(setState).toHaveBeenCalledWith(true);

    const newAddedTodo = container.querySelector('.ToDo__item span');
    expect(newAddedTodo?.innerHTML).toEqual(newTodo.content);
    expect(getByText(newTodo.content)).toBeInTheDocument();
  });

  test('Should delete todo successfully', async () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const wrapper = render(<Wrapper />);
    const { container, queryByText } = wrapper;
    await wait(() => {});
    const firstItem = container.querySelector('.Todo__delete');
    await wait(() => {
      if (firstItem) {
        fireEvent.click(firstItem);
      }
    });

    expect(queryByText(mockedToDoList[0].content)).not.toBeInTheDocument();
  });

  test('Should delete all todo successfully', async () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const wrapper = render(<Wrapper />);
    const { container, getByText } = wrapper;
    await wait(() => {});
    const clearAllBtn = container.querySelector('.Action__btn.clear-all');
    await wait(() => {
      if (clearAllBtn) {
        fireEvent.click(clearAllBtn);
      }
    });

    const remainTodoItem = container.querySelectorAll('.ToDo__item');
    expect(remainTodoItem.length).toEqual(0);
    expect(getByText(noItemText)).toBeInTheDocument();
  });

  test('Should set pagination info and set from to data correct', async () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const expectedPageValue = {
      currentPage: 2,
      perPage: 10,
    };
    const expectedFromToValue = {
      from: 10,
      to: 20,
    };
    const wrapper = render(<Wrapper />);
    const { container } = wrapper;
    await wait(() => {});
    const pageTwoBtn = container.querySelector('.pagination-item.pagination-page-2');
    await wait(() => {
      pageTwoBtn && fireEvent.click(pageTwoBtn);
    });

    expect(setState).toHaveBeenCalledWith(expectedPageValue);
    expect(setState).toHaveBeenCalledWith(expectedFromToValue);
  });

  test('Should toggle completed all todo successfully', async () => {
    const itemPerPage = 10;
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const wrapper = render(<Wrapper />);
    const { container } = wrapper;
    await wait(() => {});
    const checkAllBtn = container.querySelector('.check-all');
    await wait(() => {
      if (checkAllBtn) {
        fireEvent.click(checkAllBtn);
      }
    });

    const remainTodoItem = container.querySelectorAll('.ToDo__item .done-status');
    expect(remainTodoItem.length).toEqual(itemPerPage);
  });

  test('Should toggle completed todo successfully', async () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const wrapper = render(<Wrapper />);
    const { container } = wrapper;
    await wait(() => {});
    const checkBox = container.querySelector('.ToDo__item input[type="checkbox"]');
    await wait(() => {
      if (checkBox) {
        fireEvent.click(checkBox);
      }
    });

    const remainTodoItem = container.querySelectorAll('.ToDo__item .done-status');
    expect(remainTodoItem.length).toEqual(1);
  });
});
