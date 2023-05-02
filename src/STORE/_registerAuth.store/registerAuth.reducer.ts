import { tassign } from 'tassign';
import {
  ADD_REGISTER_AUTH,
  ADD_REGISTER_AUTH_ERROR,
  ADD_REGISTER_AUTH_SUCCESS,
  FETCH_REGISTER_AUTH,
  FETCH_REGISTER_AUTH_ERROR,
  FETCH_REGISTER_AUTH_SUCCESS,
} from './registerAuth.actions';
import {
  INITIAL_REGISTER_AUTH_STATE,
  JID_RegisterAuthState,
} from './registerAuth.store';

export function RegisterAuthReducer(
  state: JID_RegisterAuthState | any = INITIAL_REGISTER_AUTH_STATE,
  action: any
): JID_RegisterAuthState {
  switch (action.type) {
    case FETCH_REGISTER_AUTH:
      
      return tassign(state, {
        isLoading: true,
      });
    case FETCH_REGISTER_AUTH_SUCCESS:
      
      return tassign(state, {
        registerAuth: action.payload,
        isLoading: false,
      });

    case FETCH_REGISTER_AUTH_ERROR:
      
      return tassign(state, {
        error: action.payload,
      });


       // ADD REGISTER AUTH
    case ADD_REGISTER_AUTH:
      return tassign(state, {
        isLoading: true,
      });
    case ADD_REGISTER_AUTH_SUCCESS:
      var newRegisterAuth = action.payload;
      return tassign(state, {
        // Instead of the push() method, we use the concat() method because the former mutates
        // the original array, whereas the latter returns a new array.
        registerAuth: newRegisterAuth,
        // lastUpdate: new Date(),
        isLoading: false,
      });
    case ADD_REGISTER_AUTH_ERROR:
      return tassign(state, {
        error: action.payload,
        isLoading: false,
      });
  }
  return state;
}
