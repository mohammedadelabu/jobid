import { tassign } from 'tassign';
import {
  ADD_COMPANY,
  ADD_COMPANY_ERROR,
  ADD_COMPANY_SUCCESS,
  FETCH_COMPANY_DETAILS,
  FETCH_COMPANY_DETAILS_ERROR,
  FETCH_COMPANY_DETAILS_SUCCESS,
  FETCH_COMPANY_LIST,
  FETCH_COMPANY_LIST_ERROR,
  FETCH_COMPANY_LIST_FORUSER,
  FETCH_COMPANY_LIST_FORUSER_ERROR,
  FETCH_COMPANY_LIST_FORUSER_SUCCESS,
  FETCH_COMPANY_LIST_SUCCESS,
  REMOVE_COMPANY_FOR_USER,
  Bulk_REMOVE_COMPANY_FOR_USER,
  Bulk_REMOVE_COMPANY_FOR_USER_ERROR,
  Bulk_REMOVE_COMPANY_FOR_USER_SUCCESS,
  REMOVE_COMPANY_FOR_USER_ERROR,
  REMOVE_COMPANY_FOR_USER_SUCCESS,
  UPDATE_COMPANY,
  UPDATE_COMPANY_ERROR,
  UPDATE_COMPANY_SUCCESS,
} from './company.actions';
import {
  AddCompany,
  AddCompanyFailure,
  AddCompanySuccess,
  BulkRemoveCompanyForUser,
  BulkRemoveCompanyForUserFailure,
  BulkRemoveCompanyForUserSuccess,
  FetchCompanyDetails,
  FetchCompanyDetailsFailure,
  FetchCompanyDetailsSuccess,
  FetchCompanyList,
  FetchCompanyListFailure,
  FetchCompanyListSuccess,
  RemoveCompanyForUser,
  RemoveCompanyForUserFailure,
  RemoveCompanyForUserSuccess,
  UpdateCompany,
  UpdateCompanyFailure,
  UpdateCompanySuccess,
} from './company.functions';
import { INITIAL_COMPANY_STATE, JID_CompanyState } from './company.store';

export function CompanyReducer(
  state: JID_CompanyState | any = INITIAL_COMPANY_STATE,
  action: any
): JID_CompanyState {
  switch (action.type) {
    // FETCH COMPANY LIST
    case FETCH_COMPANY_LIST:
      return FetchCompanyList(state, action);
    case FETCH_COMPANY_LIST_SUCCESS:
      return FetchCompanyListSuccess(state, action);

    case FETCH_COMPANY_LIST_ERROR:
      return FetchCompanyListFailure(state, action);


    // FETCH COMPANY LIST FOR USER
    case FETCH_COMPANY_LIST_FORUSER:
      return tassign(state, {
        // isLoading: true,
        isLoadingCompanyListForUser: true
      });
    case FETCH_COMPANY_LIST_FORUSER_SUCCESS:
      return tassign(state, {
        companyListForUser: action.payload,
        // isLoading: false,
        isLoadingCompanyListForUser: false
      });

    case FETCH_COMPANY_LIST_FORUSER_ERROR:
      return tassign(state, {
        error: action.payload,
        // isLoading: false,
        isLoadingCompanyListForUser: false
      });

    // ADD COMPANY
    case ADD_COMPANY:
      return AddCompany(state, action);
    case ADD_COMPANY_SUCCESS:
      return AddCompanySuccess(state, action);
    case ADD_COMPANY_ERROR:
      return AddCompanyFailure(state, action);

    // FETCH COMPANY DETAILS
    case FETCH_COMPANY_DETAILS:
      return FetchCompanyDetails(state, action);
    case FETCH_COMPANY_DETAILS_SUCCESS:
      return FetchCompanyDetailsSuccess(state, action);
    case FETCH_COMPANY_DETAILS_ERROR:
      return FetchCompanyDetailsFailure(state, action);

    // UPDATE COMPANY DETAILS
    case UPDATE_COMPANY:
      return UpdateCompany(state, action);
    case UPDATE_COMPANY_SUCCESS:
      return UpdateCompanySuccess(state, action);
    case UPDATE_COMPANY_ERROR:
      return UpdateCompanyFailure(state, action);

    // REMOVE COMPANY COMPANY FOR USER
    case REMOVE_COMPANY_FOR_USER:
      return RemoveCompanyForUser(state, action);
    case REMOVE_COMPANY_FOR_USER_SUCCESS:
      return RemoveCompanyForUserSuccess(state, action);
    case REMOVE_COMPANY_FOR_USER_ERROR:
      return RemoveCompanyForUserFailure(state, action);

    // BULK REMOVE COMPANY COMPANY FOR USER
    case Bulk_REMOVE_COMPANY_FOR_USER:
      return BulkRemoveCompanyForUser(state, action);
    case Bulk_REMOVE_COMPANY_FOR_USER_SUCCESS:
      return BulkRemoveCompanyForUserSuccess(state, action);
    case Bulk_REMOVE_COMPANY_FOR_USER_ERROR:
      return BulkRemoveCompanyForUserFailure(state, action);
  }
  return state;
}
