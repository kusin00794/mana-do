// Need to refactor it

export enum TodoStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ALL = 'ALL'
}

export interface Todo {
  id: string
  user_id: string
  content : string
  status?: TodoStatus
  created_date: string
}

export interface IToResponse {
  data: Todo[];
  total: number;
}