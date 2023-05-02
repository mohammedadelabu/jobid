import { tassign } from 'tassign';
import {
  ADD_LOGIN_AUTH,
  ADD_LOGIN_AUTH_ERROR,
  ADD_LOGIN_AUTH_SUCCESS,
  FETCH_LOGIN_AUTH,
  FETCH_LOGIN_AUTH_ERROR,
  FETCH_LOGIN_AUTH_SUCCESS,
} from './loginAuth.actions';
import {
  INITIAL_LOGIN_AUTH_STATE,
  JID_LoginAuthState,
} from './loginAuth.store';

export function LoginAuthReducer(
  state: JID_LoginAuthState | any = INITIAL_LOGIN_AUTH_STATE,
  action: any
): JID_LoginAuthState {
  switch (action.type) {
    case FETCH_LOGIN_AUTH:
      return tassign(state, {
        isLoading: true,
      });
    case FETCH_LOGIN_AUTH_SUCCESS:
      return tassign(state, {
        loginAuth: action.payload,
        isLoading: false,
      });

    case FETCH_LOGIN_AUTH_ERROR:
      return tassign(state, {
        error: action.payload,
        isLoading: false,
      });


       // ADD LOGINU AUTH
    case ADD_LOGIN_AUTH:
      return tassign(state, {
        isLoading: true,
      });
    case ADD_LOGIN_AUTH_SUCCESS:
      // var newTodo = { id: state.todos.length + 1, title: action.title };
      var newLoginAuth = action.payload;
      return tassign(state, {
        // Instead of the push() method, we use the concat() method because the former mutates
        // the original array, whereas the latter returns a new array.
        loginAuth: newLoginAuth,
        // lastUpdate: new Date(),
        isLoading: false,
      });
    case ADD_LOGIN_AUTH_ERROR:
      return tassign(state, {
        error: action.payload,
        isLoading: false,
      });
  }
  return state;
}
