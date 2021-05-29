import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import ToDoForm from '../../modules/todo/ToDoForm';

const ToDoPage = (props: RouteComponentProps) => {
  return <ToDoForm {...props} />;
};

export default ToDoPage;
