import { tassign } from 'tassign';
import {
  ADD_BRANCH_LOCATION,
  ADD_BRANCH_LOCATION_ERROR,
  ADD_BRANCH_LOCATION_SUCCESS,
  ADD_HQ_LOCATION,
  ADD_HQ_LOCATION_ERROR,
  ADD_HQ_LOCATION_SUCCESS,
  FETCH_BRANCH_LOCATION_LIST,
  FETCH_BRANCH_LOCATION_LIST_ERROR,
  FETCH_BRANCH_LOCATION_LIST_SUCCESS,
  FETCH_HQ_LOCATION_LIST,
  FETCH_HQ_LOCATION_LIST_ERROR,
  FETCH_HQ_LOCATION_LIST_SUCCESS,
  REMOVE_BRANCH_LOCATION,
  REMOVE_BRANCH_LOCATION_ERROR,
  REMOVE_BRANCH_LOCATION_SUCCESS,
  UPDATE_BRANCH_LOCATION,
  UPDATE_BRANCH_LOCATION_ERROR,
  UPDATE_BRANCH_LOCATION_SUCCESS,
} from './branchLocation.actions';
import {
  AddBranchLocation,
  AddBranchLocationFailure,
  AddBranchLocationSuccess,
  AddHqLocation,
  AddHqLocationFailure,
  AddHqLocationSuccess,
  FetchBranchLocationList,
  FetchBranchLocationListFailure,
  FetchBranchLocationListSuccess,
  FetchHqLocationList,
  FetchHqLocationListFailure,
  FetchHqLocationListSuccess,
  UpdateBranchLocation,
  UpdateBranchLocationFailure,
  UpdateBranchLocationSuccess,
} from './branchLocation.functions';

import {
  INITIAL_BRANCH_LOCATION__STATE,
  JID_BranchLocationState,
} from './branchLocation.store';

export function BranchLocationReducer(
  state: JID_BranchLocationState | any = INITIAL_BRANCH_LOCATION__STATE,
  action: any
): JID_BranchLocationState {
  switch (action.type) {
    // FETCH_BRANCH_LOCATION
    case FETCH_BRANCH_LOCATION_LIST:
      return FetchBranchLocationList(state, action);
    case FETCH_BRANCH_LOCATION_LIST_SUCCESS:
      return FetchBranchLocationListSuccess(state, action);

    case FETCH_BRANCH_LOCATION_LIST_ERROR:
      return FetchBranchLocationListFailure(state, action);

    // ADD_BRANCH
    case ADD_BRANCH_LOCATION:
      return AddBranchLocation(state, action);
    case ADD_BRANCH_LOCATION_SUCCESS:
      return AddBranchLocationSuccess(state, action);
    case ADD_BRANCH_LOCATION_ERROR:
      return AddBranchLocationFailure(state, action);

    // UPDATE_BRANCH
    case UPDATE_BRANCH_LOCATION:
      return UpdateBranchLocation(state, action);
    case UPDATE_BRANCH_LOCATION_SUCCESS:
      return UpdateBranchLocationSuccess(state, action);
    case UPDATE_BRANCH_LOCATION_ERROR:
      return UpdateBranchLocationFailure(state, action);

    // REMOVE_BRANCH_LOCATION
    case REMOVE_BRANCH_LOCATION:
      return tassign(state, {
        isLoading: true,
      });

    case REMOVE_BRANCH_LOCATION_SUCCESS:
      return tassign(state, {
        branchList: state.branchList.filter(
          (t: any) => t.Id !== action.payload
        ),
        isLoading: false,
      });
    case REMOVE_BRANCH_LOCATION_ERROR:
      return tassign(state, {
        error: action.payload,
        isLoading: false,
      });

    // FETCH_HQ_LOCATION
    case FETCH_HQ_LOCATION_LIST:
      return FetchHqLocationList(state, action);
    case FETCH_HQ_LOCATION_LIST_SUCCESS:
      return FetchHqLocationListSuccess(state, action);
    case FETCH_HQ_LOCATION_LIST_ERROR:
      return FetchHqLocationListFailure(state, action);
    // ADD_HQ_LOCATION
    case ADD_HQ_LOCATION:
      return AddHqLocation(state, action);
    case ADD_HQ_LOCATION_SUCCESS:
      return AddHqLocationSuccess(state, action);
    case ADD_HQ_LOCATION_ERROR:
      return AddHqLocationFailure(state, action);
  }
  return state;
}
// function uPDATELeadFailure(state: any, action: any): JID_BranchLocationState {
//   throw new Error('Function not implemented.');
// }
