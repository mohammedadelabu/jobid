import { tassign } from 'tassign';
import { JID_CompanyDetailsState } from './companyDetails.store';

// FETCH COMPANY DETAILS
export const FetchCompanyDetails = (state: JID_CompanyDetailsState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchCompanyDetailsSuccess = (
  state: JID_CompanyDetailsState,
  action: any
) => {
  return tassign(state, {
    error: null,
    companyDetails: action.payload,
    isLoading: false,
  });
};
export const FetchCompanyDetailsFailure = (
  state: JID_CompanyDetailsState,
  action: any
) => {
  return tassign(state, {
    companyDetails: null,
    error: action.payload,
    isLoading: false,
  });
};