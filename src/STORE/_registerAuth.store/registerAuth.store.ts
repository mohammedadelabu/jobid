export interface JID_RegisterAuthState {
  registerAuth: any;
  error: any;
//   lastUpdate: Date;
  isLoading: boolean;
}

export const INITIAL_REGISTER_AUTH_STATE: JID_RegisterAuthState = {
  registerAuth: null,
  error: null,
//   lastUpdate: new Date(),
  isLoading: false,
};
