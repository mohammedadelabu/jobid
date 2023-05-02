export interface JID_TasksState {
  taskList: any;
  error: any;
  isLoading: boolean;
}

export const INITIAL_TASKS_STATE: JID_TasksState = {
  taskList: null,
  error: null,
  isLoading: false,
};
