import { tassign } from 'tassign';
import {
  ADD_SKILL,
  ADD_SKILL_ERROR,
  ADD_SKILL_SUCCESS,
  FETCH_CANDIDATE_LIST_BY_SKILLS,
  FETCH_CANDIDATE_LIST_BY_SKILLS_ERROR,
  FETCH_CANDIDATE_LIST_BY_SKILLS_SUCCESS,
  FETCH_SKILLS_LIST,
  FETCH_SKILLS_LIST_ERROR,
  FETCH_SKILLS_LIST_SUCCESS,
  REMOVE_SKILL,
  REMOVE_SKILL_ERROR,
  REMOVE_SKILL_SUCCESS,
  UPDATE_SKILL,
  UPDATE_SKILL_ERROR,
  UPDATE_SKILL_SUCCESS,
} from './skill.actions';
import { INITIAL_SKILL_STATE, JID_SkillState } from './skill.store';

// FETCH skillsList
const FetchskillsList = (state: JID_SkillState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
const FetchskillsListSuccess = (state: JID_SkillState, action: any) => {
  return tassign(state, {
    skillsList: action?.payload,
    isLoading: false,
  });
};
const FetchskillsListFailure = (state: JID_SkillState, action: any) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// ADD SKILL

const AddSkill = (state: JID_SkillState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};

const AddSkillSuccess = (state: JID_SkillState, action: any) => {
  var newSkill = {
    id: state.skillsList?.length + 1,
    ...action.payload,
  };
  return tassign(state, {
    skillsList: action.payload,
    isLoading: false,
    // lastUpdate: new Date(),
  });
};

const AddSkillFailure = (state: JID_SkillState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// UPDATE SKILL
const UpdateSkill = (state: JID_SkillState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};

const UpdateSkillSuccess = (state: JID_SkillState, action: any) => {
  var skillItem = state.skillsList.find((t: any) => t.Id === action.Id);

  var index = state.skillsList.indexOf(skillItem);
  
  return tassign(state, {
    skillsList: [
      ...state.skillsList.slice(0, index),
      // tassign(skillItem, { isCompleted: !skillItem.isCompleted }),
      tassign(skillItem, action.data.payload),
      ...state.skillsList.slice(index + 1),
    ],
    isLoading: false,
  });
};
const UpdateSkillFailure = (state: JID_SkillState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

export function SkillReducer(
  state: JID_SkillState | any = INITIAL_SKILL_STATE,
  action: any
): JID_SkillState {
  switch (action.type) {
    // FETCH_SKILL_LIST
    case FETCH_SKILLS_LIST:
      return FetchskillsList(state, action);
    case FETCH_SKILLS_LIST_SUCCESS:
      return FetchskillsListSuccess(state, action);

    case FETCH_SKILLS_LIST_ERROR:
      return FetchskillsListFailure(state, action);

    // ADD_SKILL
    case ADD_SKILL:
      return AddSkill(state, action);
    case ADD_SKILL_SUCCESS:
      return AddSkillSuccess(state, action);
    case ADD_SKILL_ERROR:
      return AddSkillFailure(state, action);

    // UPDATE_SKILL
    case UPDATE_SKILL:
      return UpdateSkill(state, action);
    case UPDATE_SKILL_SUCCESS:
      return UpdateSkillSuccess(state, action);
    case UPDATE_SKILL_ERROR:
      return UpdateSkillFailure(state, action);

    // REMOVE_SKILL
    case REMOVE_SKILL:
      return tassign(state, {
        isLoading: true,
      });

    case REMOVE_SKILL_SUCCESS:
      return tassign(state, {
        skillsList: action.payload,
        isLoading: false,
      });
    case REMOVE_SKILL_ERROR:
      return tassign(state, {
        error: action.payload,
        isLoading: false,
      });

      // 
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
// function uPDATESkillFailure(state: any, action: any): JID_SkillState {
//   throw new Error('Function not implemented.');
// }
