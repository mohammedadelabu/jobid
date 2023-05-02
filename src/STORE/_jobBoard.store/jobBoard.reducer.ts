import { tassign } from 'tassign';
import {
  FETCH_JOB_VACANCY,
  FETCH_JOB_VACANCY_SUCCESS,
  FETCH_JOB_VACANCY_ERROR,
  UPDATE_COMPANY_PROCESS,
  UPDATE_COMPANY_PROCESS_SUCCESS,
  UPDATE_COMPANY_PROCESS_ERROR,
} from './jobBoard.actions';
import { INITIAL_JOBBOARD_STATE, JID_JobBoardState } from './jobBoard.store';

// FETCH JOB VACANCY
const FetchJobVacancy = (state: JID_JobBoardState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
const FetchJobVacancySuccess = (state: JID_JobBoardState, action: any) => {
  return tassign(state, {
    error: null,
    jobDetail: action.payload,
    isLoading: false,
  });
};
const FetchJobVacancyFailure = (state: JID_JobBoardState, action: any) => {
  return tassign(state, {
    jobDetail: null,
    error: action.payload,
    isLoading: false,
  });
};

// UPDATE COMPANY PROCESS
const UpdateCompanyProcess = (state: JID_JobBoardState, action: any) => {
  return tassign(state, {
    updateCompanyProcessLoading: true,
  });
};

const UpdateCompanyProcessSuccess = (state: JID_JobBoardState, action: any) => {
  let existingState = { ...state };
  existingState.jobDetail.interviewStages = action.payload;
  existingState.updateCompanyProcessLoading = false;
  existingState.error = null;

  return existingState;
};

const UpdateCompanyProcessFailure = (state: JID_JobBoardState, action: any) => {
  return tassign(state, {
    error: action.payload,
    updateCompanyProcessLoading: false,
  });
};

export function JobBoardReducer(
  state: JID_JobBoardState | any = INITIAL_JOBBOARD_STATE,
  action: any
): JID_JobBoardState {
  switch (action.type) {
    // FETCH JOB VACANCY
    case FETCH_JOB_VACANCY:
      return FetchJobVacancy(state, action);
    case FETCH_JOB_VACANCY_SUCCESS:
      return FetchJobVacancySuccess(state, action);
    case FETCH_JOB_VACANCY_ERROR:
      return FetchJobVacancyFailure(state, action);

    // UPDATE COMPANY PROCESS
    case UPDATE_COMPANY_PROCESS:
      return UpdateCompanyProcess(state, action);
    case UPDATE_COMPANY_PROCESS_SUCCESS:
      return UpdateCompanyProcessSuccess(state, action);
    case UPDATE_COMPANY_PROCESS_ERROR:
      return UpdateCompanyProcessFailure(state, action);
    default:
      return state;
  }
}
