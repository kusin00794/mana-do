import React, { useState } from 'react';

import { KEY_NAMES } from '../../constants/keyCode';
import { isTodoCompleted } from '../../utils';
import { IToDoList, UpdateToDoInfo } from './TodoList.d';

// I will build a common page for render only listing page if we need to separate this app to CRUD
const ToDoList = (props: IToDoList) => {
  const { showTodos, onUpdateTodoStatus, onDeleteTodo, onUpdateToDo, showingStatus } = props;
  const [updateToDo, setUpdateToDo] = useState<UpdateToDoInfo | null>(null);

  const handleOnUpdateTodoStatus = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    const checked = e.target.checked;
    onUpdateTodoStatus(checked, todoId);
  };

  const handleOnDoubleClick = (todoInfo: UpdateToDoInfo) => {
    setUpdateToDo(todoInfo);
  };

  const handleOnBlur = () => {
    setUpdateToDo(null);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
    const newTodoInfo = {
      content: e.target.value,
      todoId,
    };

    setUpdateToDo(newTodoInfo);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEY_NAMES.ENTER) {
      if (updateToDo && updateToDo.content) {
        onUpdateToDo(updateToDo);
        setUpdateToDo(null);
      } else {
        setUpdateToDo(null);
      }
    }
  };

  return (
    <div className="ToDo__list col-12">
      {Array.isArray(showTodos) && showTodos.length > 0 ? (
        showTodos.map((todo, index) => {
          const { id, content } = todo;
          const todoInfo = { todoId: id, content };

          return (
            <div key={index} className="ToDo__item">
              <input
                key={`checkbox-status-${index}`}
                id={`checkbox-status-${index}`}
                type="checkbox"
                className={`${isTodoCompleted(todo) ? 'done-status' : ''}`}
                checked={isTodoCompleted(todo)}
                onChange={(e) => handleOnUpdateTodoStatus(e, id)}
              />
              {updateToDo && updateToDo.todoId === id ? (
                <input
                  key={`input-edit-${index}`}
                  id={`input-edit-${index}`}
                  className="update-todo"
                  type="text"
                  value={updateToDo.content}
                  onBlur={handleOnBlur}
                  onChange={(e) => handleOnChange(e, id)}
                  onKeyDown={handleOnKeyDown}
                  autoFocus
                />
              ) : (
                <>
                  <span onDoubleClick={() => handleOnDoubleClick(todoInfo)}>{content}</span>
                  <button className="Todo__delete" onClick={() => onDeleteTodo(id)}>
                    X
                  </button>
                </>
              )}
            </div>
          );
        })
      ) : (
        <div className="text-center">
          No to do item with the following status: <strong>{showingStatus && showingStatus.toLocaleLowerCase()}</strong>
        </div>
      )}
    </div>
  );
};

export default ToDoList;
