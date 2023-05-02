import {
  FETCH_COMPANY_CONTACT_LIST,
  FETCH_COMPANY_CONTACT_LIST_ERROR,
  FETCH_COMPANY_CONTACT_LIST_SUCCESS,
  //REMOVE CONTACT
  REMOVE_COMPANY_CONTACT,
  REMOVE_COMPANY_CONTACT_ERROR,
  REMOVE_COMPANY_CONTACT_SUCCESS,
} from './companyContact.actions';
import {
  FetchCompanyContactList,
  FetchCompanyContactListFailure,
  FetchCompanyContactListSuccess,
  RemoveCompanyContact,
  RemoveCompanyContactFailure,
  RemoveCompanyContactSuccess,
} from './companyContact.functions';
import {
  INITIAL_COMPANY_CONTACT_STATE,
  JID_CompanyContactListState,
} from './companyContact.store';

export function CompanyContactListReducer(
  state: JID_CompanyContactListState | any = INITIAL_COMPANY_CONTACT_STATE,
  action: any
): JID_CompanyContactListState {
  switch (action.type) {
    // FETCH_DEAL_LIST
    case FETCH_COMPANY_CONTACT_LIST:
      return FetchCompanyContactList(state, action);
    case FETCH_COMPANY_CONTACT_LIST_SUCCESS:
      return FetchCompanyContactListSuccess(state, action);
    case FETCH_COMPANY_CONTACT_LIST_ERROR:
      return FetchCompanyContactListFailure(state, action);

    // REMOVE_DEAL
    case REMOVE_COMPANY_CONTACT:
      return RemoveCompanyContact(state, action);

    case REMOVE_COMPANY_CONTACT_SUCCESS:
      return RemoveCompanyContactSuccess(state, action);

    case REMOVE_COMPANY_CONTACT_ERROR:
      return RemoveCompanyContactFailure(state, action);
  }
  return state;
}
