export interface JID_LoggedInUserState {
  loggedInUser: any;
  error: any;
//   lastUpdate: Date;
  isLoading: boolean;
}

export const INITIAL_LOGGED_IN_USER_STATE: JID_LoggedInUserState = {
  loggedInUser: null,
  error: null,
//   lastUpdate: new Date(),
  isLoading: false,
};
