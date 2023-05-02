export interface JID_CompanyState {
  companyList: any;
  companyListForUser: any;
  companyDetails: any;
  error: any;
  isLoading: boolean;
  isLoadingCompanyList: boolean;
  isLoadingCompanyListForUser: boolean;
}

export const INITIAL_COMPANY_STATE: JID_CompanyState = {
  companyList: null,
  companyListForUser: null,
  companyDetails: null,
  error: null,
  isLoading: false,
  isLoadingCompanyList: false,
  isLoadingCompanyListForUser: false
};
