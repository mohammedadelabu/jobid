export interface JID_CompanyContactListState {
  contactList: any[];
  error: any;
  isLoading: boolean;
}

export const INITIAL_COMPANY_CONTACT_STATE: JID_CompanyContactListState = {
  contactList: [],
  error: null,
  isLoading: false,
};
