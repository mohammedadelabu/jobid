import { tassign } from 'tassign';
import { JID_LeadTagState } from './leadTag.store';

// FETCH LEADTAGS
export const FetchLeadTags = (state: JID_LeadTagState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchLeadTagsSuccess = (state: JID_LeadTagState, action: any) => {
  return tassign(state, {
    leadTags: action?.payload,
    isLoading: false,
  });
};
export const FetchLeadTagsFailure = (state: JID_LeadTagState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};


// ADD_LEAD_TAG
export const AddLeadTag = (
  state: JID_LeadTagState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const AddLeadTagSuccess = (
  state: JID_LeadTagState,
  action: any
) => {
  var newLocation = {
    id: state.leadTags?.length + 1,
    dateCreated: new Date().toDateString(),
    dateModified: null,
    name: action.payload?.Name
  };
  return tassign(state, {
    leadTags: state.leadTags.concat(newLocation),
    isLoading: false,
    // lastUpdate: new Date(),
  });
};

export const AddLeadTagFailure = (
  state: JID_LeadTagState,
  action: any
) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};