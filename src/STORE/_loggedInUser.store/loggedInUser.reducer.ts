import { tassign } from 'tassign';
import {
  FETCH_LOGGED_IN_USER,
  FETCH_LOGGED_IN_USER_ERROR,
  FETCH_LOGGED_IN_USER_SUCCESS,
} from './loggedInUser.actions';
import {
  INITIAL_LOGGED_IN_USER_STATE,
  JID_LoggedInUserState,
} from './loggedInUser.store';

export function LoggedInUserReducer(
  state: JID_LoggedInUserState | any = INITIAL_LOGGED_IN_USER_STATE,
  action: any
): JID_LoggedInUserState {
  switch (action.type) {
    case FETCH_LOGGED_IN_USER:
      return tassign(state, {
        isLoading: true,
      });
    case FETCH_LOGGED_IN_USER_SUCCESS:
      return tassign(state, {
        loggedInUser: action.payload,
        isLoading: false,
      });

    case FETCH_LOGGED_IN_USER_ERROR:
      return tassign(state, {
        error: action.payload,
      });
  }
  return state;
}
