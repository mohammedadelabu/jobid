import { tassign } from 'tassign';
import {
  FETCH_USER_LIST,
  FETCH_USER_LIST_ERROR,
  FETCH_USER_LIST_SUCCESS,
} from './users.actions';
import { INITIAL_USERS_STATE, JID_UsersState } from './users.store';

export function UsersReducer(
  state: JID_UsersState | any = INITIAL_USERS_STATE,
  action: any
): JID_UsersState {
  switch (action.type) {
    case FETCH_USER_LIST:
      
      return tassign(state, {
        isLoading: true,
      });
    case FETCH_USER_LIST_SUCCESS:
      
      return tassign(state, {
        userList: action.payload,
        isLoading: false,
      });

    case FETCH_USER_LIST_ERROR:
      
      return tassign(state, {
        error: action.payload,
      });
  }
  return state;
}
