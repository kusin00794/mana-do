import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Service from '../../service';
import RoutesString from '../../pages/routesString';

import './LoginForm.scss';

const LoginForm = () => {
  // move to authentication state
  const isLoggedIn = localStorage.getItem('auth');
  const [form, setForm] = useState({
    userId: '',
    password: '',
  });
  const history = useHistory();

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { userId, password } = form;
    const resp = await Service.signIn(userId, password);

    localStorage.setItem('auth', JSON.stringify({ token: resp, userId }));
    history.push(RoutesString.Welcome);
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (isLoggedIn) {
      return history.push(RoutesString.Welcome);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="login-form">
      <form onSubmit={signIn} className="row">
        <div className="col-12">
          <label htmlFor="user_id">
            User id
            <input id="user_id" name="userId" value={form.userId} onChange={onChangeField} />
          </label>
        </div>
        <div className="col-12">
          <label htmlFor="password">
            Password
            <input id="password" name="password" type="password" value={form.password} onChange={onChangeField} />
          </label>
        </div>
        <div className="col-12">
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
