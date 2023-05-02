export interface JID_UsersState {
  // userList: any[];
  userList: any;
  error: any;
  //   lastUpdate: Date;
  isLoading: boolean;
}

export const INITIAL_USERS_STATE: JID_UsersState = {
  // userList: [],
  userList: null,
  error: null,
  //   lastUpdate: new Date(),
  isLoading: false,
};
