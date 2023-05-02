export interface JID_CandidateState {
  // candidatesList: any[];
  candidatesList: any;
  error: any;
  //   lastUpdate: Date;
  isLoading: boolean;
}

export const INITIAL_CANDIDATE_STATE: JID_CandidateState = {
  // candidatesList: [],
  candidatesList: null,
  error: null,
  //   lastUpdate: new Date(),
  isLoading: false,
};
