import {
  ADD_DEAL_CONTACT,
  ADD_DEAL_CONTACT_ERROR,
  ADD_DEAL_CONTACT_SUCCESS,
  FETCH_DEAL_CONTACT_LIST,
  FETCH_DEAL_CONTACT_LIST_ERROR,
  FETCH_DEAL_CONTACT_LIST_SUCCESS,
  //REMOVE CONTACT
  REMOVE_DEAL_CONTACT,
  REMOVE_DEAL_CONTACT_ERROR,
  REMOVE_DEAL_CONTACT_SUCCESS,
  UPDATE_DEAL_CONTACT,
  UPDATE_DEAL_CONTACT_ERROR,
  UPDATE_DEAL_CONTACT_SUCCESS,
} from './dealContact.actions';
import {
  FetchDealContactList,
  FetchDealContactListFailure,
  FetchDealContactListSuccess,
  RemoveDealContact,
  RemoveDealContactFailure,
  RemoveDealContactSuccess,
  UpdateDealContact,
  UpdateDealContactFailure,
  UpdateDealContactSuccess,
  AddDealContact,
  AddDealContactSuccess,
  AddDealContactFailure,

} from './dealContact.functions';
import {
  INITIAL_DEAL_CONTACT_STATE,
  JID_DealContactListState,
} from './dealContact.store';

export function DealContactListReducer(
  state: JID_DealContactListState | any = INITIAL_DEAL_CONTACT_STATE,
  action: any
): JID_DealContactListState {
  switch (action.type) {
    // FETCH_DEAL_LIST
    case FETCH_DEAL_CONTACT_LIST:
      return FetchDealContactList(state, action);
    case FETCH_DEAL_CONTACT_LIST_SUCCESS:
      return FetchDealContactListSuccess(state, action);
    case FETCH_DEAL_CONTACT_LIST_ERROR:
      return FetchDealContactListFailure(state, action);

    // ADD_DEAL
    case ADD_DEAL_CONTACT:
      return AddDealContact(state, action);
    case ADD_DEAL_CONTACT_SUCCESS:
      return AddDealContactSuccess(state, action);
    case ADD_DEAL_CONTACT_ERROR:
      return AddDealContactFailure(state, action);

    // UPDATE_DEAL
    case UPDATE_DEAL_CONTACT:
      return UpdateDealContact(state, action);
    case UPDATE_DEAL_CONTACT_SUCCESS:
      return UpdateDealContactSuccess(state, action);
    case UPDATE_DEAL_CONTACT_ERROR:
      return UpdateDealContactFailure(state, action);

    // REMOVE_DEAL
    case REMOVE_DEAL_CONTACT:
      return RemoveDealContact(state, action);
    case REMOVE_DEAL_CONTACT_SUCCESS:
      return RemoveDealContactSuccess(state, action);
    case REMOVE_DEAL_CONTACT_ERROR:
      return RemoveDealContactFailure(state, action);
  }
  return state;
}
