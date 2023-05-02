import { tassign } from 'tassign';
import { JID_CompanyState } from './company.store';

// FETCH COMPANY
export const FetchCompanyList = (state: JID_CompanyState, action: any) => {
  return tassign(state, {
    isLoadingCompanyList: true
  });
};
export const FetchCompanyListSuccess = (
  state: JID_CompanyState,
  action: any
) => {
  return tassign(state, {
    companyList: action.payload,
    isLoadingCompanyList: false
  });
};
export const FetchCompanyListFailure = (
  state: JID_CompanyState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoadingCompanyList: false
  });
};

// FETCH COMPANY DETAILS
export const FetchCompanyDetails = (state: JID_CompanyState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchCompanyDetailsSuccess = (
  state: JID_CompanyState,
  action: any
) => {
  return tassign(state, {
    error: null,
    companyDetails: action.payload,
    isLoading: false,
  });
};
export const FetchCompanyDetailsFailure = (
  state: JID_CompanyState,
  action: any
) => {
  return tassign(state, {
    companyDetails: null,
    error: action.payload,
    isLoading: false,
  });
};

// ADD COMPANY
export const AddCompany = (state: JID_CompanyState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const AddCompanySuccess = (state: JID_CompanyState, action: any) => {
  var newCompany = {
    CompanyId: state.companyList?.length + 1,
    ...action.payload,
  };
  return tassign(state, {
    error: null,
    companyList: state.companyList?.concat(newCompany),
    isLoading: false,
  });
};
export const AddCompanyFailure = (state: JID_CompanyState, action: any) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// UPDATE COMPANY
export const UpdateCompany = (state: JID_CompanyState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const UpdateCompanySuccess = (state: JID_CompanyState, action: any) => {
  return tassign(state, {
    error: null,
    companyDetails: action.payload,
    isLoading: false,
  });
};
export const UpdateCompanyFailure = (state: JID_CompanyState, action: any) => {
  return tassign(state, {
    companyDetails: null,
    error: action.payload,
    isLoading: false,
  });
};


// REMOVE COMPANY
export const RemoveCompany = (state: JID_CompanyState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};

export const RemoveCompanySuccess = (state: JID_CompanyState, action: any) => {
  const Items = state.companyList?.Items.filter(
    (t: any) => t.Id !== action.payload
  );
  const data = { ...state.companyList, Items };
  return tassign(state, {
    companyList: data,
    isLoading: false,
  });
};

export const RemoveCompanyFailure = (state: JID_CompanyState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};


// REMOVE COMPANY
export const RemoveCompanyForUser = (state: JID_CompanyState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};

export const RemoveCompanyForUserSuccess = (state: JID_CompanyState, action: any) => {
  const Items = state.companyListForUser?.Items.filter(
    (t: any) => t.CompanyId !== action.payload
  );
  const data = { ...state.companyListForUser?.Items, Items };
  return tassign(state, {
    companyListForUser: data,
    isLoading: false,
  });
};

export const RemoveCompanyForUserFailure = (state: JID_CompanyState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};


// BULK REMOVE COMPANY
export const BulkRemoveCompanyForUser = (state: JID_CompanyState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const BulkRemoveCompanyForUserSuccess = (state: JID_CompanyState, action: any) => {
  let items = action.payload;
  let stateItems: any[] = state.companyListForUser?.Items;
  const companyToDeleteSet = new Set(items);
  const newArr = stateItems.filter((company) => {
    return !companyToDeleteSet.has(company?.CompanyId);
  });

  return tassign(state, {
    companyListForUser: { ...state.companyListForUser, Items: newArr },
    isLoading: false,
  });
};
export const BulkRemoveCompanyForUserFailure = (state: JID_CompanyState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};