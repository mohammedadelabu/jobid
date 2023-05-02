
import { ADD_TODO, ADD_TODO_ERROR, ADD_TODO_SUCCESS, FETCH_TODOS, FETCH_TODOS_ERROR, FETCH_TODOS_SUCCESS } from './todo.actions';
import { AddTodo, AddTodoFailure, AddTodoSuccess, FetchTodos, FetchTodosFailure, FetchTodosSuccess } from './todo.function';
import { INITIAL_TODO_STATE, JID_TodoState } from './todo.store';

export function todosReducer(
  state: JID_TodoState = INITIAL_TODO_STATE,
  action: any
): JID_TodoState {
  switch (action.type) {
    // FETCH_TODOS
    case FETCH_TODOS:
      return FetchTodos(state, action);
    case FETCH_TODOS_SUCCESS:
      return FetchTodosSuccess(state, action);
    case FETCH_TODOS_ERROR:
      return FetchTodosFailure(state, action);
    case ADD_TODO:
      return AddTodo(state, action);
    case ADD_TODO_SUCCESS:
      return AddTodoSuccess(state, action);
    case ADD_TODO_ERROR:
      return AddTodoFailure(state, action);
  }
  return state;
}
