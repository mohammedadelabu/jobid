export interface JID_CandidateBySkillsState {
  candidatesListBySkills: any[];
  error: any;
//   lastUpdate: Date;
  isLoading: boolean;
}

export const INITIAL_CANDIDATE_LIST_BY_SKILLS_STATE: JID_CandidateBySkillsState = {
  candidatesListBySkills: [],
  error: null,
//   lastUpdate: new Date(),
  isLoading: false,
};
