export interface JID_SkillState {
  skillsList: any[];
  candidatesListBySkills: any[];
  error: any;
  isLoading: boolean;
}

export const INITIAL_SKILL_STATE: JID_SkillState = {
  skillsList: [],
  candidatesListBySkills: [],
  error: null,
  isLoading: false,
};
