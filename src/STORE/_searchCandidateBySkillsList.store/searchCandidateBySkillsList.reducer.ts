import { tassign } from 'tassign';
import {
  FETCH_CANDIDATE_LIST_BY_SKILLS,
  FETCH_CANDIDATE_LIST_BY_SKILLS_ERROR,
  FETCH_CANDIDATE_LIST_BY_SKILLS_SUCCESS,
} from './searchCandidateBySkillsList.actions';
import {
  INITIAL_CANDIDATE_LIST_BY_SKILLS_STATE,
  JID_CandidateBySkillsState,
} from './searchCandidateBySkillsList.store';

export function CandidatesListBySkillsReducer(
  state: JID_CandidateBySkillsState | any = INITIAL_CANDIDATE_LIST_BY_SKILLS_STATE,
  action: any
): JID_CandidateBySkillsState {
  switch (action.type) {
    case FETCH_CANDIDATE_LIST_BY_SKILLS:
      return tassign(state, {
        isLoading: true,
      });
    case FETCH_CANDIDATE_LIST_BY_SKILLS_SUCCESS:
      return tassign(state, {
        candidatesListBySkills: action.payload,
        isLoading: false,
      });

    case FETCH_CANDIDATE_LIST_BY_SKILLS_ERROR:
      return tassign(state, {
        error: action.payload,
      });
  }
  return state;
}
