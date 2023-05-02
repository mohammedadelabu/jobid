import
  {
    FETCH_CONTACT_LIST,
    FETCH_CONTACT_LIST_ERROR,
    FETCH_CONTACT_LIST_SUCCESS,
    //REMOVE CONTACT
    REMOVE_CONTACT, REMOVE_CONTACT_ERROR, REMOVE_CONTACT_SUCCESS
  } from './contact.actions';
import
  {
    FetchContactList,
    FetchContactListFailure,
    FetchContactListSuccess,
    RemoveContact, RemoveContactFailure, RemoveContactSuccess
  } from './contact.functions';
import { INITIAL_CONTACT_STATE, JID_ContactListState } from './contact.store';

export function ContactListReducer(
  state: JID_ContactListState | any = INITIAL_CONTACT_STATE,
  action: any
): JID_ContactListState {
  switch (action.type) {
    // FETCH_DEAL_LIST
    case FETCH_CONTACT_LIST:
      return FetchContactList(state, action);
    case FETCH_CONTACT_LIST_SUCCESS:
      return FetchContactListSuccess(state, action);
    case FETCH_CONTACT_LIST_ERROR:
      return FetchContactListFailure(state, action);

    // REMOVE_DEAL
    case REMOVE_CONTACT:
      return RemoveContact(state, action);

    case REMOVE_CONTACT_SUCCESS:
      return RemoveContactSuccess(state, action);

    case REMOVE_CONTACT_ERROR:
      return RemoveContactFailure(state, action);
  }
  return state;
}
