export interface JID_LocationState {
  locationList: any[];
  error: any;
  isLoading: boolean;
}

export const INITIAL_LOCATION_STATE: JID_LocationState = {
  locationList: [],
  error: null,
  isLoading: false,
};
