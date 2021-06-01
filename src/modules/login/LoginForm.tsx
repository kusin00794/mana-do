import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import shortid from 'shortid';

import Service from '../../service';
import RoutesString from '../../pages/routesString';
import Toast, { validToastType } from '../../components/toast/Toast';

import './LoginForm.scss';

const defaultTouched = {
  userId: false,
  password: false,
};

const LoginForm = () => {
  // move to authentication state
  const isLoggedIn = localStorage.getItem('auth');
  const [form, setForm] = useState({
    userId: '',
    password: '',
  });
  const history = useHistory();
  const [toastInfo, setToastInfo] = useState({
    content: '',
    type: '',
    id: '',
  });
  // simple custom touched will enhance with Formik
  const [touched, setTouched] = useState(defaultTouched);

  const signIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { userId, password } = form;
    if (!userId || !password) {
      return;
    }

    try {
      const resp = await Service.signIn(userId, password);
      localStorage.setItem('auth', JSON.stringify({ token: resp, userId }));
      history.push(RoutesString.Welcome);
    } catch (error) {
      setToastInfo({
        content: error,
        type: validToastType.danger,
        id: shortid(),
      });
    }
  };

  const onChangeField = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    e.persist();
    setTouched({
      ...touched,
      [key]: true,
    });
    setForm({
      ...form,
      [key]: e.target.value,
    });
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
            Username (*) {!form.userId && touched.userId && <span className="text-danger">Username is required</span>}
            <input id="user_id" name="userId" value={form.userId} onChange={(e) => onChangeField(e, 'userId')} />
          </label>
        </div>
        <div className="col-12">
          <label htmlFor="password">
            Password (*){' '}
            {!form.password && touched.password && <span className="text-danger">Password is required</span>}
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={(e) => onChangeField(e, 'password')}
            />
          </label>
        </div>
        <div className="col-12">
          <button type="submit">Sign in</button>
        </div>
      </form>
      <Toast {...toastInfo} />
    </div>
  );
};

export default LoginForm;
