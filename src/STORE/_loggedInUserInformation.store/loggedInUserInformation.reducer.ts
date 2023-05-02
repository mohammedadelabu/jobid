import {
  FETCH_LOGGED_IN_USER_INFORMATION,
  FETCH_LOGGED_IN_USER_INFORMATION_ERROR,
  FETCH_LOGGED_IN_USER_INFORMATION_SUCCESS,
} from './loggedInUserInformation.action';
import {
  FetchLoggedInUderInformation,
  FetchLoggedInUderInformationFailure,
  FetchLoggedInUderInformationSuccess,
} from './loggedInUserInformation.function';
import {
  INITIAL_LOGGED_IN_USER_INFORMATION_STATE,
  JID_LoggedInUserInformationState,
} from './loggedInUserInformation.store';

export function LoggedInUserInformationReducer(
  state:
    | JID_LoggedInUserInformationState
    | any = INITIAL_LOGGED_IN_USER_INFORMATION_STATE,
  action: any
): JID_LoggedInUserInformationState {
  switch (action.type) {
    // FETCH_LOGGED_IN_USER_INFORMATION
    case FETCH_LOGGED_IN_USER_INFORMATION:
      return FetchLoggedInUderInformation(state, action);
    case FETCH_LOGGED_IN_USER_INFORMATION_SUCCESS:
      return FetchLoggedInUderInformationSuccess(state, action);
    case FETCH_LOGGED_IN_USER_INFORMATION_ERROR:
      return FetchLoggedInUderInformationFailure(state, action);
      

    //   UPDATE_LOGGED_IN_USER_INFORMATION
  }
  return state;
}
