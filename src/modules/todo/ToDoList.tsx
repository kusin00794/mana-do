import React from 'react';

import { isTodoCompleted } from '../../utils';
import { IToDoList } from './TodoList.d';

const ToDoList = (props: IToDoList) => {
  const { showTodos, onUpdateTodoStatus, onDeleteTodo } = props;
  return (
    <div className="ToDo__list">
      {showTodos.map((todo, index) => {
        return (
          <div key={index} className="ToDo__item">
            <input type="checkbox" checked={isTodoCompleted(todo)} onChange={(e) => onUpdateTodoStatus(e, todo.id)} />
            <span>{todo.content}</span>
            <button className="Todo__delete" onClick={() => onDeleteTodo(todo.id)}>
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToDoList;
