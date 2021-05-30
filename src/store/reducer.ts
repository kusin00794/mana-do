import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO,
  SET_TODO
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO: {
      /**
       * dispatch will trigger reducer twice so I change it
       * and do not mutate in the current todo inside state
       */

      // state.todos.push(action.payload);

      const newTodos = [
        action.payload,
        ...state.todos
      ];
      localStorage.setItem('todos', JSON.stringify(newTodos));

      return {
        ...state,
        todos: newTodos
      };
    }
    case UPDATE_TODO_STATUS: {
      // Do not mutate in the current todo inside state it may leak reference bug
      // const index2 = state.todos.findIndex((todo) => todo.id === action.payload.todoId);
      // state.todos[index2].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      const newTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          todo.status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
        }

        return todo;
      });
      localStorage.setItem('todos', JSON.stringify(newTodos));

      return {
        ...state,
        todos: newTodos
      }
    }
    case UPDATE_TODO: {
      const newTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.todoId) {
          todo.content = action.payload.content;
        }

        return todo;
      });
      localStorage.setItem('todos', JSON.stringify(newTodos));

      return {
        ...state,
        todos: newTodos
      }
    }
    case TOGGLE_ALL_TODOS: {
      // avoid to check redundant condition inside map not good for performance
      const currentStatus = action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;
      const newTodos = state.todos.map((todo)=>{
        return {
          ...todo,
          status: currentStatus
        }
      });
      localStorage.setItem('todos', JSON.stringify(newTodos));

      return {
        ...state,
        todos: newTodos
      }
    }
    case DELETE_TODO: {
      /**
       * dispatch will trigger reducer twice so I change it
       * and do not mutate in the current todo inside state
       */
      // const index1 = state.todos.findIndex((todo) => todo.id === action.payload);
      // state.todos.splice(index1, 1);
      const newTodos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem('todos', JSON.stringify(newTodos));

      return {
        ...state,
        todos: newTodos
      }
    }
    case DELETE_ALL_TODOS: {
      localStorage.setItem('todos', JSON.stringify([]));

      return {
        ...state,
        todos: []
      }
    }
    case SET_TODO: {
      return {
        ...state,
        todos: action.payload
      }
    }
    default: {
      return state;
    }
  }
}

export default reducer;
