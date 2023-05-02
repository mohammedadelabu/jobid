import { tassign } from 'tassign';
import { JID_LocationState } from './location.store';

// FETCH dEALSlIST
export const FetchLocations = (state: JID_LocationState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchLocationsSuccess = (
  state: JID_LocationState,
  action: any
) => {
  return tassign(state, {
    locationList: action?.payload,
    isLoading: false,
  });
};
export const FetchLocationsFailure = (
  state: JID_LocationState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};
