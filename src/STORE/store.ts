import {
  INITIAL_ADMIN_ROLE_AND_PERMISSION_STATE,
  JID_AdminRoleAndPermissionState,
} from './_adminRoleAndPermission.store/adminRoleAndPermission.store';
import {
  INITIAL_APPLICATION_MODULE_STATE,
  JID_ApplicationModuleState,
} from './_applicationModule.store/applicationModule.store';
import {
  INITIAL_BRANCH_LOCATION__STATE,
  JID_BranchLocationState,
} from './_branchLocation.store/branchLocation.store';
import {
  INITIAL_CALENDAR_EVENT_STATE,
  JID_CalendarEventState,
} from './_calendar.store/calendar.store';
import {
  INITIAL_CANDIDATE_STATE,
  JID_CandidateState,
} from './_candidate.store/candidate.store';
import {
  INITIAL_COMPANY_STATE,
  JID_CompanyState,
} from './_company.store/company.store';
import { INITIAL_COMPANY_CONTACT_STATE, JID_CompanyContactListState } from './_companyContact.store/companyContact.store';
import {
  INITIAL_COMPANY_DETAILS_STATE,
  JID_CompanyDetailsState,
} from './_companyDetails.store/companyDetails.store';
import {
  INITIAL_CONTACT_STATE,
  JID_ContactListState,
} from './_contact.store/contact.store';
import { INITIAL_DEAL_STATE, JID_DealState } from './_deal.store/deal.store';
import {
  INITIAL_DEAL_CONTACT_STATE,
  JID_DealContactListState,
} from './_dealContact.store/dealContact.store';
import {
  INITIAL_GLOBAL_SEARCH_RESULT_STATE,
  JID_GlobalSearchResultState,
} from './_globalSearch.store/globalSearch.store';
import {
  INITIAL_HELLOWORLD_STATE,
  JID_HelloworldState,
} from './_helloworld.store/helloworld.store';
import {
  INITIAL_JOBBOARD_STATE,
  JID_JobBoardState,
} from './_jobBoard.store/jobBoard.store';
import { INITIAL_LEAD_STATE, JID_LeadState } from './_lead.store/lead.store';
import {
  INITIAL_LEAD_TAG_STATE,
  JID_LeadTagState,
} from './_leadTag.store/leadTag.store';
import {
  INITIAL_LOCATION_STATE,
  JID_LocationState,
} from './_location.store/location.store';
import {
  INITIAL_LOGGED_IN_USER_STATE,
  JID_LoggedInUserState,
} from './_loggedInUser.store/loggedInUser.store';
import {
  INITIAL_LOGGED_IN_USER_INFORMATION_STATE,
  JID_LoggedInUserInformationState,
} from './_loggedInUserInformation.store/loggedInUserInformation.store';
import {
  INITIAL_LOGIN_AUTH_STATE,
  JID_LoginAuthState,
} from './_loginAuth.store/loginAuth.store';
import {
  INITIAL_REGISTER_AUTH_STATE,
  JID_RegisterAuthState,
} from './_registerAuth.store/registerAuth.store';
import {
  INITIAL_REQUISITION_STATE,
  JID_RequisitionState,
} from './_requisition.store/requisition.store';
import {
  INITIAL_CANDIDATE_LIST_BY_SKILLS_STATE,
  JID_CandidateBySkillsState,
} from './_searchCandidateBySkillsList.store/searchCandidateBySkillsList.store';
import {
  INITIAL_SKILL_STATE,
  JID_SkillState,
} from './_skill.store copy/skill.store';
import {
  INITIAL_SPOKEN_LANGUAGE_STATE,
  JID_SpokenLanguageState,
} from './_spokenLanguages.store/spokenLanguages.store';
import { INITIAL_TASKS_STATE, JID_TasksState } from './_task.store/tasks.store';
import { INITIAL_TODO_STATE, JID_TodoState } from './_todo.store/todo.store';
import {
  INITIAL_USER_BY_ID_EMAIL_STATE,
  JID_UserByIdEmailState,
} from './_userByIdEmail.store copy/userByIdEmail.store';
import {
  INITIAL_USERS_STATE,
  JID_UsersState,
} from './_users.store/users.store';

export interface IAppState {
  todos: JID_TodoState;
  candidates: JID_CandidateState;
  company: JID_CompanyState;
  companyDetails: JID_CompanyDetailsState;
  requisitionsList: JID_RequisitionState;
  leads: JID_LeadState;
  tasks: JID_TasksState;
  deals: JID_DealState;
  skillsList: JID_SkillState;
  helloworldsList: JID_HelloworldState;
  loggedInUser: JID_LoggedInUserState;
  calendarEventList: JID_CalendarEventState;
  userByIdEmail: JID_UserByIdEmailState;
  loginAuth: JID_LoginAuthState;
  registerAuth: JID_RegisterAuthState;
  candidatesListBySkills: JID_CandidateBySkillsState;
  contactList: JID_ContactListState;
  locations: JID_LocationState;
  spokenLanguages: JID_SpokenLanguageState;
  globalSearchResult: JID_GlobalSearchResultState;
  loggedInUserInformation: JID_LoggedInUserInformationState;
  adminRoles: JID_AdminRoleAndPermissionState;
  applicationModules: JID_ApplicationModuleState;
  users: JID_UsersState;
  branchLocations: JID_BranchLocationState;
  jobBoard: JID_JobBoardState;
  leadTags: JID_LeadTagState;
  dealContacts: JID_DealContactListState;
  companyContacts: JID_CompanyContactListState;
  // counter: number;
  // messaging?:{
  //   newNessages:number
  // }
}

export const INITIAL_STATE: IAppState = {
  todos: INITIAL_TODO_STATE,
  candidates: INITIAL_CANDIDATE_STATE,
  company: INITIAL_COMPANY_STATE,
  companyDetails: INITIAL_COMPANY_DETAILS_STATE,
  requisitionsList: INITIAL_REQUISITION_STATE,
  leads: INITIAL_LEAD_STATE,
  tasks: INITIAL_TASKS_STATE,
  deals: INITIAL_DEAL_STATE,
  skillsList: INITIAL_SKILL_STATE,
  helloworldsList: INITIAL_HELLOWORLD_STATE,
  loggedInUser: INITIAL_LOGGED_IN_USER_STATE,
  calendarEventList: INITIAL_CALENDAR_EVENT_STATE,
  userByIdEmail: INITIAL_USER_BY_ID_EMAIL_STATE,
  loginAuth: INITIAL_LOGIN_AUTH_STATE,
  registerAuth: INITIAL_REGISTER_AUTH_STATE,
  candidatesListBySkills: INITIAL_CANDIDATE_LIST_BY_SKILLS_STATE,
  contactList: INITIAL_CONTACT_STATE,
  locations: INITIAL_LOCATION_STATE,
  spokenLanguages: INITIAL_SPOKEN_LANGUAGE_STATE,
  globalSearchResult: INITIAL_GLOBAL_SEARCH_RESULT_STATE,
  loggedInUserInformation: INITIAL_LOGGED_IN_USER_INFORMATION_STATE,
  adminRoles: INITIAL_ADMIN_ROLE_AND_PERMISSION_STATE,
  applicationModules: INITIAL_APPLICATION_MODULE_STATE,
  users: INITIAL_USERS_STATE,
  branchLocations: INITIAL_BRANCH_LOCATION__STATE,
  jobBoard: INITIAL_JOBBOARD_STATE,
  leadTags: INITIAL_LEAD_TAG_STATE,
  dealContacts: INITIAL_DEAL_CONTACT_STATE,
  companyContacts: INITIAL_COMPANY_CONTACT_STATE
  // counter: 0,
  // messaging:{
  //   newNessages:5
  // }
};
