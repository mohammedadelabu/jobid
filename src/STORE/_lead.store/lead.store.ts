export interface JID_LeadState {
  leadsList: any;
  importLeadFileRespondMsg: any;
  error: any;
  isLoading: boolean;
}

export const INITIAL_LEAD_STATE: JID_LeadState = {
  leadsList: null,
  importLeadFileRespondMsg: null,
  error: null,
  isLoading: false,
};
