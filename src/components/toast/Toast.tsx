import React, { FC, useEffect, useState } from 'react';

import { IToast } from './Toast.d';
import './Toast.scss';

export const validToastType = {
  danger: 'danger',
  warning: 'warning',
  info: 'info',
  success: 'success',
};

const autoHideTime = 3000;

const Toast: FC<IToast> = ({ content, type, id }) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (id) {
      setIsShow(true);
      const interval = setInterval(() => {
        setIsShow(false);
      }, autoHideTime);
      return () => {
        clearInterval(interval);
      };
    }
  }, [id]);

  let toastType = '';
  switch (type) {
    case validToastType.danger:
      toastType = validToastType.danger;
      break;
    case validToastType.warning:
      toastType = validToastType.warning;
      break;
    case validToastType.info:
      toastType = validToastType.info;
      break;
    case validToastType.success:
      toastType = validToastType.success;
      break;
    default:
      toastType = validToastType.info;
      break;
  }

  return <div className={`toast${isShow ? ' show' : ''} ${toastType}`}>{content}</div>;
};

export default Toast;
