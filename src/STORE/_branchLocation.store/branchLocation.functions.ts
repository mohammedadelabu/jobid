import { BranchType } from 'src/app/services/branch-location.service';
import { tassign } from 'tassign';
import { JID_BranchLocationState } from './branchLocation.store';

// FETCH_BRANCH_LOCATION
export const FetchBranchLocationList = (
  state: JID_BranchLocationState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchBranchLocationListSuccess = (
  state: JID_BranchLocationState,
  action: any
) => {
  return tassign(state, {
    branchLocationList: action?.payload,
    isLoading: false,
  });
};
export const FetchBranchLocationListFailure = (
  state: JID_BranchLocationState,
  action: any
) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// ADD_BRANCH_LOCATION
export const AddBranchLocation = (
  state: JID_BranchLocationState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const AddBranchLocationSuccess = (
  state: JID_BranchLocationState,
  action: any
) => {
  var newLocation = {
    id: state.branchLocationList?.length + 1,
    Street: action.payload?.Street,
    City: action.payload?.City,
    Country: action.payload?.Country,
    PostCode: action.payload?.PostCode,
    Name: action.payload?.BranchName,
    // branchType: action.payload?.BranchType == BranchType.HQ ? 1 : 2,
    branchType: action.payload?.BranchType,
  };
  return tassign(state, {
    branchLocationList: state.branchLocationList.concat(newLocation),
    isLoading: false,
    // lastUpdate: new Date(),
  });
};

export const AddBranchLocationFailure = (
  state: JID_BranchLocationState,
  action: any
) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};


// UPDATE_BRANCH_LOCATION
export const UpdateBranchLocation = (
  state: JID_BranchLocationState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};

export const UpdateBranchLocationSuccess = (
  state: JID_BranchLocationState,
  action: any
) => {

  var locationItem = state.branchLocationList?.find(
    (t: any) => t.Id === action.payload.Id
  );
  // Now, we need to find the position of this item in the array.
  var index = state.branchLocationList?.indexOf(locationItem);
  return tassign(state, {
    branchLocationList: [
      ...state.branchLocationList?.slice(0, index),
      tassign(locationItem, action.payload),
      ...state.branchLocationList?.slice(index + 1),
    ],
    isLoading: false,
  });
};
export const UpdateBranchLocationFailure = (
  state: JID_BranchLocationState,
  action: any
) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// REMOVE_BRANCH_LOCATION
export const RemoveBranchLocation = (
  state: JID_BranchLocationState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};

export const RemoveBranchLocationSuccess = (
  state: JID_BranchLocationState,
  action: any
) => {
  const stage = state.branchLocationList.find(
    (s: any) => s.id == action?.payload.stage.id
  );
  const deals_ = stage.deals.filter((d: any) => d.Id != action?.payload.dealId);

  const newbranchListState = state.branchLocationList.find(
    (ds: any) => ds.id == stage.id
  );
  let again = { ...newbranchListState, deals: deals_ };
  let x = state.branchLocationList.filter((t: any) => t.id != again.id);
  return tassign(state, {
    // branchLocationList: state.branchLocationList.filter((t: any) => t.Id != action.payload),
    // branchLocationList: [...x, again],
    isLoading: false,
  });
};

export const RemoveBranchLocationFailure = (
  state: JID_BranchLocationState,
  action: any
) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};



// FETCH_HQ_LOCATION
export const FetchHqLocationList = (
  state: JID_BranchLocationState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchHqLocationListSuccess = (
  state: JID_BranchLocationState,
  action: any
) => {
  return tassign(state, {
    hqLocationList: action?.payload,
    isLoading: false,
  });
};
export const FetchHqLocationListFailure = (
  state: JID_BranchLocationState,
  action: any
) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};


// ADD_HQ_LOCATION
export const AddHqLocation = (
  state: JID_BranchLocationState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const AddHqLocationSuccess = (
  state: JID_BranchLocationState,
  action: any
) => {
  var newLocation = {
    id: state.hqLocationList?.length + 1,
    Street: action.payload?.Street,
    City: action.payload?.City,
    Country: action.payload?.Country,
    PostCode: action.payload?.PostCode,
    Name: action.payload?.BranchName,
    // branchType: action.payload?.BranchType == BranchType.HQ ? 1 : 2,
    branchType: action.payload?.BranchType,
  };
  return tassign(state, {
    hqLocationList: state.hqLocationList.concat(newLocation),
    isLoading: false,
    // lastUpdate: new Date(),
  });
};

export const AddHqLocationFailure = (
  state: JID_BranchLocationState,
  action: any
) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};