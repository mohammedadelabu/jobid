export interface JID_JobBoardState {
  jobDetail: any;
  error: any;
  isLoading: boolean;
  updateCompanyProcessLoading: boolean;
}

export const INITIAL_JOBBOARD_STATE: JID_JobBoardState = {
  jobDetail: null,
  error: null,
  isLoading: false,
  updateCompanyProcessLoading: false
};
