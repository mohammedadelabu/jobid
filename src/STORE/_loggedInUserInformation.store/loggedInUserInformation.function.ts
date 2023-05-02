import { tassign } from 'tassign';
import { JID_LoggedInUserInformationState } from './loggedInUserInformation.store';

// FETCH LOGGED_IN_USER_INFORMATION
export const FetchLoggedInUderInformation = (
  state: JID_LoggedInUserInformationState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchLoggedInUderInformationSuccess = (
  state: JID_LoggedInUserInformationState,
  action: any
) => {
  return tassign(state, {
    loggedInUserInformation: action?.payload,
    isLoading: false,
  });
};
export const FetchLoggedInUderInformationFailure = (
  state: JID_LoggedInUserInformationState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};


// UPDATE LOGGED_IN_USER_INFORMATION
