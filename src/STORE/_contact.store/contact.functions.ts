import { tassign } from 'tassign';
import { JID_ContactListState } from './contact.store';

// FETCH CONTACT LIST
export const FetchContactList = (state: JID_ContactListState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchContactListSuccess = (
  state: JID_ContactListState,
  action: any
) => {
  return tassign(state, {
    contactList: action?.payload,
    isLoading: false,
  });
};
export const FetchContactListFailure = (
  state: JID_ContactListState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

export const RemoveContact = (state: JID_ContactListState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const RemoveContactSuccess = (
  state: JID_ContactListState,
  action: any
) => {
  const stage = state.contactList.find(
    (s: any) => s.id == action?.payload.stage.id
  );
  const contact_ = stage.contact.filter(
    (d: any) => d.Id != action?.payload.dealId
  );

  const newcontactListState = state.contactList.find(
    (ds: any) => ds.id == stage.id
  );
  let again = { ...newcontactListState, contacts: contact_ };
  let x = state.contactList.filter((t: any) => t.id != again.id);
  return tassign(state, {
    isLoading: false,
  });
};
export const RemoveContactFailure = (
  state: JID_ContactListState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};
