export interface JID_LoggedInUserInformationState {
    loggedInUserInformation: any;
    error: any;
  //   lastUpdate: Date;
    isLoading: boolean;
  }
  
  export const INITIAL_LOGGED_IN_USER_INFORMATION_STATE: JID_LoggedInUserInformationState = {
    loggedInUserInformation: null,
    error: null,
  //   lastUpdate: new Date(),
    isLoading: false,
  };
  