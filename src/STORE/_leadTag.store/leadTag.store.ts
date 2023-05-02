export interface JID_LeadTagState {
  leadTags: any;
  error: any;
  isLoading: boolean;
}

export const INITIAL_LEAD_TAG_STATE: JID_LeadTagState = {
  leadTags: null,
  error: null,
  isLoading: false,
};
