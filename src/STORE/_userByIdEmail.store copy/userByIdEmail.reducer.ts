import { tassign } from 'tassign';
import {
  ADD_USER_BY_ID_EMAIL,
  ADD_USER_BY_ID_EMAIL_ERROR,
  ADD_USER_BY_ID_EMAIL_SUCCESS,
  FETCH_USER_BY_ID_EMAIL,
  FETCH_USER_BY_ID_EMAIL_ERROR,
  FETCH_USER_BY_ID_EMAIL_SUCCESS,
  REMOVE_USER_BY_ID_EMAIL,
  REMOVE_USER_BY_ID_EMAIL_ERROR,
  REMOVE_USER_BY_ID_EMAIL_SUCCESS,
} from './userByIdEmail.actions';
import {
  INITIAL_USER_BY_ID_EMAIL_STATE,
  JID_UserByIdEmailState,
} from './userByIdEmail.store';

export function UserByIdEmailReducer(
  state: JID_UserByIdEmailState | any = INITIAL_USER_BY_ID_EMAIL_STATE,
  action: any
): JID_UserByIdEmailState {
  switch (action.type) {
    // FETCH CALENDAR EVENTs
    case FETCH_USER_BY_ID_EMAIL:
      return tassign(state, {
        isLoading: true,
      });
    case FETCH_USER_BY_ID_EMAIL_SUCCESS:
      return tassign(state, {
        userByIdEmail: action.payload,
        isLoading: false,
      });

    case FETCH_USER_BY_ID_EMAIL_ERROR:
      return tassign(state, {
        error: action.payload,
      });

    // ADD CALENDAR EVENT
    case ADD_USER_BY_ID_EMAIL:
      return tassign(state, {
        isLoading: true,
      });
    case ADD_USER_BY_ID_EMAIL_SUCCESS:
      var newUser = {
        id: state.userByIdEmail?.length + 1,
        ...action.payload,
      };

      return tassign(state, {
        userByIdEmail: state.userByIdEmail.concat(newUser),
        isLoading: false,
        // lastUpdate: new Date(),
      });

    case ADD_USER_BY_ID_EMAIL_ERROR:
      return tassign(state, {
        error: action.payload,
        isLoading: false,
      });

    // REMOVECALENDAR EVENT
    case REMOVE_USER_BY_ID_EMAIL:
      return tassign(state, {
        isLoading: true,
      });

    case REMOVE_USER_BY_ID_EMAIL_SUCCESS:
      return tassign(state, {
        userByIdEmail: state.userByIdEmail.filter(
          (t: any) => t.Id !== action.payload
        ),
        isLoading: false,
      });
    case REMOVE_USER_BY_ID_EMAIL_ERROR:
      return tassign(state, {
        error: action.payload,
        isLoading: false,
      });
  }
  return state;
}
