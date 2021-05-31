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
];

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
    expect(setState).toHaveBeenCalledWith(TodoStatus.ALL);
    expect(setState).toHaveBeenCalledWith(TodoStatus.ACTIVE);
    expect(setState).toHaveBeenCalledWith(TodoStatus.COMPLETED);
  });

  test('Should create todo successfully', () => {
    const setState = jest.fn();
    const useStateMock: any = (initState: any) => [initState, setState];
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);
    const wrapper = render(<Wrapper />);
    const { container } = wrapper;
    const todoInput = container.querySelector('.Todo__input');
    // console.log(todoInput);
  });
});
