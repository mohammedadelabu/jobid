import { FETCH_LOCATION_LIST, FETCH_LOCATION_LIST_ERROR, FETCH_LOCATION_LIST_SUCCESS } from "./location.actions";
import { FetchLocations, FetchLocationsFailure, FetchLocationsSuccess } from "./location.functions";
import { INITIAL_LOCATION_STATE, JID_LocationState } from "./location.store";

export function LocationReducer(
  state: JID_LocationState | any = INITIAL_LOCATION_STATE,
  action: any
): JID_LocationState {
  switch (action.type) {
    // FETCH_LOCATION_LIST
    case FETCH_LOCATION_LIST:
      return FetchLocations(state, action);
    case FETCH_LOCATION_LIST_SUCCESS:
      return FetchLocationsSuccess(state, action);
    case FETCH_LOCATION_LIST_ERROR:
      return FetchLocationsFailure(state, action);

  }

  return state
  
}
