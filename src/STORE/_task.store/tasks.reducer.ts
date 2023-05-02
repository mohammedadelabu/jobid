import {
  ADD_TASK,
  ADD_TASK_ERROR,
  ADD_TASK_SUCCESS,
  FETCH_TASKS_LIST,
  FETCH_TASKS_LIST_ERROR,
  FETCH_TASKS_LIST_SUCCESS,
  UPDATE_TASKS,
  UPDATE_TASKS_ERROR,
  UPDATE_TASKS_SUCCESS,
} from './tasks.actions';
import {
  AddTasks,
  AddTasksFailure,
  AddTasksSuccess,
  FetchTaskList,
  FetchTaskListFailure,
  FetchTaskListSuccess,
  UpdateTasks,
  UpdateTasksFailure,
  UpdateTasksSuccess,
} from './tasks.functions';
import { INITIAL_TASKS_STATE, JID_TasksState } from './tasks.store';

export function TasksReducer(
  state: JID_TasksState | any = INITIAL_TASKS_STATE,
  action: any
): JID_TasksState {
  switch (action.type) {
    // FETCH_TASKS_LIST
    case FETCH_TASKS_LIST:
      return FetchTaskList(state, action);
    case FETCH_TASKS_LIST_SUCCESS:
      return FetchTaskListSuccess(state, action);
    case FETCH_TASKS_LIST_ERROR:
      return FetchTaskListFailure(state, action);

    // ADD_TASK
    case ADD_TASK:
      return AddTasks(state, action);
    case ADD_TASK_SUCCESS:
      return AddTasksSuccess(state, action);
    case ADD_TASK_ERROR:
      return AddTasksFailure(state, action);

    // UPDATE_TASKS
    case UPDATE_TASKS:
      return UpdateTasks(state, action);
    case UPDATE_TASKS_SUCCESS:
      return UpdateTasksSuccess(state, action);
    case UPDATE_TASKS_ERROR:
      return UpdateTasksFailure(state, action);

    // REMOVE_TASKS
    // case REMOVE_TASKS:
    //   return RemoveTasks(state, action);
    // case REMOVE_TASKS_SUCCESS:
    //   return RemoveTasksSuccess(state, action);
    // case REMOVE_TASKS_ERROR:
    //   return RemoveTasksFailure(state, action);
  }
  return state;
}
