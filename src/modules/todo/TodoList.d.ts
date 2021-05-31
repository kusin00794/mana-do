import { Todo, TodoStatus } from '../../models/todo';

export interface UpdateToDoInfo {
  todoId: string;
  content: string;
};

export interface IToDoList {
  showingStatus: TodoStatus;
  showTodos: Array<Todo>;
  onUpdateTodoStatus: (checked: boolean, todoId: string) => void;
  onDeleteTodo: (todoId: string) => void;
  onUpdateToDo: (todoInfo: UpdateToDoInfo) => void;
};
