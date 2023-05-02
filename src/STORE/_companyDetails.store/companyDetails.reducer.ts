import { tassign } from 'tassign';
import {
  FETCH_COMPANY_DETAILS,
  FETCH_COMPANY_DETAILS_ERROR,
  FETCH_COMPANY_DETAILS_SUCCESS,
} from './companyDetails.actions';
import {
  FetchCompanyDetails,
  FetchCompanyDetailsFailure,
  FetchCompanyDetailsSuccess,
} from './companyDetails.functions';
import { INITIAL_COMPANY_DETAILS_STATE, JID_CompanyDetailsState } from './companyDetails.store';

export function CompanyDetailsReducer(
  state: JID_CompanyDetailsState | any = INITIAL_COMPANY_DETAILS_STATE,
  action: any
): JID_CompanyDetailsState {
  switch (action.type) {

    // FETCH COMPANY DETAILS
    case FETCH_COMPANY_DETAILS:
      return FetchCompanyDetails(state, action);
    case FETCH_COMPANY_DETAILS_SUCCESS:
      return FetchCompanyDetailsSuccess(state, action);
    case FETCH_COMPANY_DETAILS_ERROR:
      return FetchCompanyDetailsFailure(state, action);
  }
  return state;
}
