import React, { useEffect, useReducer, useRef, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import ToDoList from './ToDoList';
import Pagination, { defaultPaginationInfo, firstPage, defaultPerPage } from '../../components/pagination/Pagination';
import { IPaginationInfo } from '../../components/pagination/Pagination.d';
import reducer, { initialState } from '../../store/reducer';
import {
  setTodos,
  createTodo,
  deleteTodo,
  toggleAllTodos,
  deleteAllTodos,
  updateTodoStatus,
  updateTodo,
} from '../../store/actions';
import Service from '../../service';
import { TodoStatus } from '../../models/todo';
import { isTodoCompleted } from '../../utils';
import { KEY_NAMES } from '../../constants/keyCode';
import RoutesString from '../../pages/routesString';
import { UpdateToDoInfo } from './TodoList.d';

import './ToDoForm.scss';

const ToDoForm = ({ history }: RouteComponentProps) => {
  const [{ todos }, dispatch] = useReducer(reducer, initialState);
  // No need to add more type
  const [showing, setShowing] = useState<TodoStatus>(TodoStatus.ALL);
  const inputRef = useRef<HTMLInputElement>(null);
  const [paginationInfo, setPaginationInfo] = useState(defaultPaginationInfo);
  const [fromToItem, setFromToItem] = useState({
    from: 0,
    to: defaultPaginationInfo.perPage,
  });
  const [isRefreshData, setIsRefreshData] = useState(false);
  const [isDeleteAction, setIsDeleteAction] = useState(false);

  const handleFetchToDo = async () => {
    const resp = await Service.getTodos();
    dispatch(setTodos(resp || []));
  };

  const handlePagination = (newPaginationInfo: IPaginationInfo) => {
    setPaginationInfo(newPaginationInfo);
    const { currentPage, perPage } = newPaginationInfo;
    const from = (currentPage - 1) * perPage;
    const to = currentPage * perPage;
    const newFromToItem = { from, to };
    setFromToItem(newFromToItem);
  };

  useEffect(() => {
    handleFetchToDo();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationInfo]);

  useEffect(() => {
    if (isRefreshData) {
      const { currentPage, perPage } = paginationInfo;
      const condition = todos.length % defaultPerPage === 0 && currentPage > firstPage;
      const newPaginationInfo = {
        currentPage: condition ? currentPage - firstPage : currentPage,
        perPage,
      };
      const finalPaginationInfo = isDeleteAction ? newPaginationInfo : defaultPaginationInfo;
      handlePagination(finalPaginationInfo);
      setIsRefreshData(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefreshData]);

  const onCreateTodo = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === KEY_NAMES.ENTER && inputRef.current && e.currentTarget.value) {
      try {
        const resp = await Service.createTodo(inputRef.current.value);
        dispatch(createTodo(resp));
        inputRef.current.value = '';

        /**
         * In case user is viewing in completed status
         * if the user add a new to do then the user can not see it
         * so I set to the active for the user can see it
         * We can change it base on REQs also
         */
        setShowing(TodoStatus.ACTIVE);
        setIsRefreshData(true);
      } catch (e) {
        if (e.response.status === 401) {
          history.push(RoutesString.Welcome);
        }
      }
    }
  };

  const onUpdateTodoStatus = (checked: boolean, todoId: string) => {
    dispatch(updateTodoStatus(todoId, checked));
  };

  const onUpdateToDo = (todoInfo: UpdateToDoInfo) => {
    dispatch(updateTodo(todoInfo));
  };

  /**
   * About the toggle all todo here I think it may same behavior with Bulk action
   * of listing page I have implemented in CMS project
   * Currently It will set all page but the correct behavior I think here is
   * When clicking into bulk all we just need to set all items of the current page
   * then if the user clicks on page 2 we recall the API to get page 2 data
   * after that, if the user clicks into bulk again we will store all items of page 2
   * into current stored items (existed page 1).
   * Same behavior when click in another page
   */
  const onToggleAllTodo = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(toggleAllTodos(e.target.checked));
  };

  const onDeleteAllTodo = () => {
    dispatch(deleteAllTodos());
  };

  const onDeleteTodo = (todoId: string) => {
    dispatch(deleteTodo(todoId));
    setIsDeleteAction(true);
    setIsRefreshData(true);
  };

  // I think we should sort todo list follow some logic like newest, etc
  const showTodos = todos.slice(fromToItem.from, fromToItem.to).filter((todo) => {
    switch (showing) {
      case TodoStatus.ACTIVE:
        return todo.status === TodoStatus.ACTIVE;
      case TodoStatus.COMPLETED:
        return todo.status === TodoStatus.COMPLETED;
      default:
        return true;
    }
  });

  const activeTodos = todos.reduce(function (accum, todo) {
    return isTodoCompleted(todo) ? accum : accum + 1;
  }, 0);

  const allCompletedChecked = activeTodos === 0 && showing !== TodoStatus.ACTIVE;

  return (
    <div className="ToDo__container row">
      <div className="Todo__creation col-12">
        <input ref={inputRef} className="Todo__input" placeholder="What need to be done?" onKeyDown={onCreateTodo} />
      </div>
      <ToDoList
        showingStatus={showing}
        showTodos={showTodos}
        onUpdateTodoStatus={onUpdateTodoStatus}
        onDeleteTodo={onDeleteTodo}
        onUpdateToDo={onUpdateToDo}
      />
      {todos.length > 0 && (
        <div className="col-12">
          <Pagination
            total={todos.length}
            handlePagination={handlePagination}
            externalCurrentPage={paginationInfo.currentPage}
          />
        </div>
      )}
      <div className="Todo__toolbar col-12">
        {todos.length > 0 ? (
          <input type="checkbox" checked={allCompletedChecked} onChange={onToggleAllTodo} />
        ) : (
          <div />
        )}
        <div className="Todo__tabs">
          <button className="Action__btn all" onClick={() => setShowing(TodoStatus.ALL)}>
            All
          </button>
          <button className="Action__btn active" onClick={() => setShowing(TodoStatus.ACTIVE)}>
            Active
          </button>
          <button className="Action__btn completed" onClick={() => setShowing(TodoStatus.COMPLETED)}>
            Completed
          </button>
        </div>
        <button className="Action__btn clear-all" onClick={onDeleteAllTodo}>
          Clear all todos
        </button>
      </div>
    </div>
  );
};

export default ToDoForm;
