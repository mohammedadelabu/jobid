import { combineReducers } from 'redux';
import { AdminRoleAndPermissionReducer } from './_adminRoleAndPermission.store/adminRoleAndPermission.reducer';
import { ApplicationModuleReducer } from './_applicationModule.store/applicationModule.reducer';
import { BranchLocationReducer } from './_branchLocation.store/branchLocation.reducer';
import { CalendarEventReducer } from './_calendar.store/calendar.reducer';
import { CandidateReducer } from './_candidate.store/candidate.reducer';
import { CompanyReducer } from './_company.store/company.reducer';
import { CompanyContactListReducer } from './_companyContact.store/companyContact.reducer';
import { CompanyDetailsReducer } from './_companyDetails.store/companyDetails.reducer';
import { ContactListReducer } from './_contact.store/contact.reducer';
import { DealReducer } from './_deal.store/deal.reducer';
import { DealContactListReducer } from './_dealContact.store/dealContact.reducer';
import { GlobalSearchResultReducer } from './_globalSearch.store/globalSearch.reducer';
import { HelloworldReducer } from './_helloworld.store/helloworld.reducer';
import { JobBoardReducer } from './_jobBoard.store/jobBoard.reducer';
import { LeadReducer } from './_lead.store/lead.reducer';
import { LeadTagReducer } from './_leadTag.store/leadTag.reducer';
import { LocationReducer } from './_location.store/location.reducer';
import { LoggedInUserReducer } from './_loggedInUser.store/loggedInUser.reducer';
import { LoggedInUserInformationReducer } from './_loggedInUserInformation.store/loggedInUserInformation.reducer';
import { LoginAuthReducer } from './_loginAuth.store/loginAuth.reducer';
import { RegisterAuthReducer } from './_registerAuth.store/registerAuth.reducer';
import { RequisitionReducer } from './_requisition.store/requisition.reducer';
import { CandidatesListBySkillsReducer } from './_searchCandidateBySkillsList.store/searchCandidateBySkillsList.reducer';
import { SkillReducer } from './_skill.store copy/skill.reducer';
import { SpokenLanguageReducer } from './_spokenLanguages.store/spokenLanguages.reducer';
import { TasksReducer } from './_task.store/tasks.reducer';
import { todosReducer } from './_todo.store/todo.reducer';
import { UserByIdEmailReducer } from './_userByIdEmail.store copy/userByIdEmail.reducer';
import { UsersReducer } from './_users.store/users.reducer';

export const rootReducer = combineReducers({
  todos: todosReducer,
  candidates: CandidateReducer,
  company: CompanyReducer,
  companyDetails: CompanyDetailsReducer,
  requisitionsList: RequisitionReducer,
  leads: LeadReducer,
  tasks: TasksReducer,
  deals: DealReducer,
  helloworldsList: HelloworldReducer,
  skillsList: SkillReducer,
  loggedInUser: LoggedInUserReducer,
  calendarEventList: CalendarEventReducer,
  userByIdEmail: UserByIdEmailReducer,
  loginAuth: LoginAuthReducer,
  registerAuth: RegisterAuthReducer,
  candidatesListBySkills: CandidatesListBySkillsReducer,
  contactList: ContactListReducer,
  locations: LocationReducer,
  spokenLanguages: SpokenLanguageReducer,
  globalSearchResult: GlobalSearchResultReducer,
  loggedInUserInformation: LoggedInUserInformationReducer,
  adminRoles: AdminRoleAndPermissionReducer,
  applicationModules: ApplicationModuleReducer,
  users: UsersReducer,
  branchLocations: BranchLocationReducer,
  jobBoard: JobBoardReducer,
  leadTags: LeadTagReducer,
  dealContacts: DealContactListReducer,
  companyContacts: CompanyContactListReducer,
});
