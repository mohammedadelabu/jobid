export interface JID_UserByIdEmailState {
  userByIdEmail: any;
  error: any;
  //   lastUpdate: Date;
  isLoading: boolean;
}

export const INITIAL_USER_BY_ID_EMAIL_STATE: JID_UserByIdEmailState = {
  userByIdEmail: [],
  error: null,
  //   lastUpdate: new Date(),
  isLoading: false,
};
