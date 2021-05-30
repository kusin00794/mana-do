import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import Service from '../../service';
import RoutesString from '../../pages/routesString';

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
    <div style={{ marginTop: '3rem', textAlign: 'left' }}>
      <form onSubmit={signIn}>
        <label htmlFor="user_id">
          User id
          <input id="user_id" name="userId" value={form.userId} style={{ marginTop: 12 }} onChange={onChangeField} />
        </label>
        <br />
        <label htmlFor="password">
          Password
          <input
            id="password"
            name="password"
            type="password"
            style={{ marginTop: 12 }}
            value={form.password}
            onChange={onChangeField}
          />
        </label>
        <br />
        <button type="submit" style={{ marginTop: 12 }}>
          Sign in
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
