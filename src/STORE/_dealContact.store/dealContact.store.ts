export interface JID_DealContactListState {
  contactList: any[];
  error: any;
  isLoading: boolean;
}

export const INITIAL_DEAL_CONTACT_STATE: JID_DealContactListState = {
  contactList: [],
  error: null,
  isLoading: false,
};
