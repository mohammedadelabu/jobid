export interface JID_LoginAuthState {
  loginAuth: any;
  error: any;
//   lastUpdate: Date;
  isLoading: boolean;
}

export const INITIAL_LOGIN_AUTH_STATE: JID_LoginAuthState = {
  loginAuth: null,
  error: null,
//   lastUpdate: new Date(),
  isLoading: false,
};
