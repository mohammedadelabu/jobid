import { tassign } from 'tassign';
import {
  FETCH_CANDIDATE_LIST,
  FETCH_CANDIDATE_LIST_ERROR,
  FETCH_CANDIDATE_LIST_SUCCESS,
} from './candidate.actions';
import { INITIAL_CANDIDATE_STATE, JID_CandidateState } from './candidate.store';

export function CandidateReducer(
  state: JID_CandidateState | any = INITIAL_CANDIDATE_STATE,
  action: any
): JID_CandidateState {
  switch (action.type) {
    case FETCH_CANDIDATE_LIST:
      return tassign(state, {
        isLoading: true,
      });
    case FETCH_CANDIDATE_LIST_SUCCESS:
      return tassign(state, {
        candidatesList: action.payload,
        isLoading: false,
      });

    case FETCH_CANDIDATE_LIST_ERROR:
      return tassign(state, {
        error: action.payload,
      });
  }
  return state;
}
