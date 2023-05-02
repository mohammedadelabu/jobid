import { tassign } from 'tassign';
import {
  ADD_LEAD_TAG,
  ADD_LEAD_TAG_ERROR,
  ADD_LEAD_TAG_SUCCESS,
  FETCH_LEAD_TAGS,
  FETCH_LEAD_TAGS_ERROR,
  FETCH_LEAD_TAGS_SUCCESS,
} from './leadTag.actions';
import {
  AddLeadTag,
  AddLeadTagFailure,
  AddLeadTagSuccess,
  FetchLeadTags,
  FetchLeadTagsFailure,
  FetchLeadTagsSuccess,
} from './lead.functions';
import { INITIAL_LEAD_TAG_STATE, JID_LeadTagState } from './leadTag.store';

export function LeadTagReducer(
  state: JID_LeadTagState | any = INITIAL_LEAD_TAG_STATE,
  action: any
): JID_LeadTagState {
  switch (action.type) {
    // FETCH_LEAD_TAGS
    case FETCH_LEAD_TAGS:
      return FetchLeadTags(state, action);
    case FETCH_LEAD_TAGS_SUCCESS:
      return FetchLeadTagsSuccess(state, action);
    case FETCH_LEAD_TAGS_ERROR:
      return FetchLeadTagsFailure(state, action);

    // ADD_LEAD_TAG
    case ADD_LEAD_TAG:
      return AddLeadTag(state, action);
    case ADD_LEAD_TAG_SUCCESS:
      return AddLeadTagSuccess(state, action);
    case ADD_LEAD_TAG_ERROR:
      return AddLeadTagFailure(state, action);
  }
  return state;
}
// function uPDATELeadFailure(state: any, action: any): JID_LeadState {
//   throw new Error('Function not implemented.');
// }
