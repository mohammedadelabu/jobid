export interface JID_TodoState {
  todos: any;
  error: any;
  isLoading: boolean;
}

export const INITIAL_TODO_STATE: JID_TodoState = {
  todos: null,
  error: null,
  isLoading: false,
};