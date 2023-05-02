export interface JID_BranchLocationState {
  branchLocationList: any[];
  hqLocationList: any[];
  error: any;
  isLoading: boolean;
}

export const INITIAL_BRANCH_LOCATION__STATE: JID_BranchLocationState = {
  branchLocationList: [],
  hqLocationList: [],
  error: null,
  isLoading: false,
};
