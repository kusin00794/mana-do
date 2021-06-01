import React from 'react';
import { render, wait, fireEvent } from '@testing-library/react';

import Service from '../../service';
import { testSnapshots } from '../../utils/test';
import RoutesString from '../../pages/routesString';
import LoginForm from './LoginForm';

const mockToken = 'testabc.xyz.ahk';
const mockHistoryPush = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
  useLocation: () => ({}),
}));

describe('<LoginForm />', () => {
  testSnapshots(LoginForm, [
    {
      props: {},
      description: 'default render',
    },
  ]);
});

describe('Handle Logic', () => {
  test('Should login successfully and redirect user to home page', async () => {
    Service.signIn = jest.fn().mockResolvedValue(mockToken);
    const event = {
      persist: jest.fn(),
    };
    const userInfo = {
      id: 'firstUser',
      password: 'example',
    };
    const wrapper = render(<LoginForm />);
    const { container } = wrapper;
    const userId = container.querySelector('#user_id');
    const userPassword = container.querySelector('#password');
    const button = container.querySelector('button');

    await wait(() => {
      userId &&
        fireEvent.change(userId, {
          ...event,
          target: {
            name: 'userId',
            value: userInfo.id,
          },
        });
      userPassword &&
        fireEvent.change(userPassword, {
          ...event,
          target: {
            name: 'password',
            value: userInfo.password,
          },
        });
      button && fireEvent.click(button);
    });

    expect(mockHistoryPush).toHaveBeenCalledWith(RoutesString.Welcome);
  });
});
