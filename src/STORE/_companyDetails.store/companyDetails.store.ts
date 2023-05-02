export interface JID_CompanyDetailsState {
  companyDetails: any;
  error: any;
//   lastUpdate: Date;
  isLoading: boolean;
}

export const INITIAL_COMPANY_DETAILS_STATE: JID_CompanyDetailsState = {
  companyDetails: null,
  error: null,
//   lastUpdate: new Date(),
  isLoading: false,
};
