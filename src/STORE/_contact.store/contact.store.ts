export interface JID_ContactListState {
  contactList: any;
  error: any;
  isLoading: boolean;
}

export const INITIAL_CONTACT_STATE: JID_ContactListState = {
  contactList: null,
  error: null,
  isLoading: false,
};
