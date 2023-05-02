import { tassign } from 'tassign';
import {
  ADD_LEAD,
  ADD_LEAD_ERROR,
  ADD_LEAD_SUCCESS,
  BULK_REMOVE_LEAD,
  BULK_REMOVE_LEAD_ERROR,
  BULK_REMOVE_LEAD_SUCCESS,
  FETCH_LEADS_LIST,
  FETCH_LEADS_LIST_ERROR,
  FETCH_LEADS_LIST_SUCCESS,
  IMPORT_LEAD_FILE,
  IMPORT_LEAD_FILE_ERROR,
  IMPORT_LEAD_FILE_SUCCESS,
  REMOVE_LEAD,
  REMOVE_LEAD_ERROR,
  REMOVE_LEAD_SUCCESS,
  UPDATE_LEAD,
  UPDATE_LEAD_ERROR,
  UPDATE_LEAD_SUCCESS,
} from './lead.actions';
import {
  AddLead,
  AddLeadFailure,
  AddLeadSuccess,
  BulkRemoveLead,
  BulkRemoveLeadFailure,
  BulkRemoveLeadSuccess,
  FetchLeadsList,
  FetchLeadsListFailure,
  FetchLeadsListSuccess,
  ImportLeadFile,
  ImportLeadFileFailure,
  ImportLeadFileSuccess,
  RemoveLead,
  RemoveLeadFailure,
  RemoveLeadSuccess,
  UpdateLead,
  UpdateLeadFailure,
  UpdateLeadSuccess,
} from './lead.functions';
import { INITIAL_LEAD_STATE, JID_LeadState } from './lead.store';

export function LeadReducer(
  state: JID_LeadState | any = INITIAL_LEAD_STATE,
  action: any
): JID_LeadState {
  switch (action.type) {
    // FETCH_LEAD_LIST
    case FETCH_LEADS_LIST:
      return FetchLeadsList(state, action);
    case FETCH_LEADS_LIST_SUCCESS:
      return FetchLeadsListSuccess(state, action);

    case FETCH_LEADS_LIST_ERROR:
      return FetchLeadsListFailure(state, action);

    // ADD_LEAD
    case ADD_LEAD:
      return AddLead(state, action);
    case ADD_LEAD_SUCCESS:
      return AddLeadSuccess(state, action);
    case ADD_LEAD_ERROR:
      return AddLeadFailure(state, action);

    // UPDATE_LEAD
    case UPDATE_LEAD:
      return UpdateLead(state, action);
    case UPDATE_LEAD_SUCCESS:
      return UpdateLeadSuccess(state, action);
    case UPDATE_LEAD_ERROR:
      return UpdateLeadFailure(state, action);

    // REMOVE_LEAD
    case REMOVE_LEAD:
      return RemoveLead(state, action);
    case REMOVE_LEAD_SUCCESS:
      return RemoveLeadSuccess(state, action);
    case REMOVE_LEAD_ERROR:
      return RemoveLeadFailure(state, action);

      // BULK_REMOVE_LEAD
      case BULK_REMOVE_LEAD:
        return BulkRemoveLead(state, action);
      case BULK_REMOVE_LEAD_SUCCESS:
        return BulkRemoveLeadSuccess(state, action);
      case BULK_REMOVE_LEAD_ERROR:
        return BulkRemoveLeadFailure(state, action);

    // IMPORT_LEAD_FILE
    case IMPORT_LEAD_FILE:
      return ImportLeadFile(state, action);
    case IMPORT_LEAD_FILE_SUCCESS:
      return ImportLeadFileSuccess(state, action);
    case IMPORT_LEAD_FILE_ERROR:
      return ImportLeadFileFailure(state, action);
  }
  return state;
}
// function uPDATELeadFailure(state: any, action: any): JID_LeadState {
//   throw new Error('Function not implemented.');
// }
