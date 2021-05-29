import { Todo } from '../../models/todo';

export interface IToDoList {
  showTodos: Array<Todo>;
  onUpdateTodoStatus: (e: React.ChangeEvent<HTMLInputElement>, todoId: string) => void;
  onDeleteTodo: (todoId: string) => void;
}
