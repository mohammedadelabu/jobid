import { tassign } from 'tassign';
import { JID_CompanyContactListState } from './companyContact.store';

// FETCH CONTACT LIST
export const FetchCompanyContactList = (
  state: JID_CompanyContactListState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchCompanyContactListSuccess = (
  state: JID_CompanyContactListState,
  action: any
) => {
  return tassign(state, {
    contactList: action?.payload,
    isLoading: false,
  });
};
export const FetchCompanyContactListFailure = (
  state: JID_CompanyContactListState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

export const RemoveCompanyContact = (state: JID_CompanyContactListState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const RemoveCompanyContactSuccess = (
  state: JID_CompanyContactListState,
  action: any
) => {
  const stage = state.contactList.find(
    (s: any) => s.id == action?.payload.stage.id
  );
  const contact_ = stage.contact.filter(
    (d: any) => d.Id != action?.payload.dealId
  );

  const newContactListState = state.contactList.find(
    (ds: any) => ds.id == stage.id
  );
  let again = { ...newContactListState, contacts: contact_ };
  let x = state.contactList.filter((t: any) => t.id != again.id);
  return tassign(state, {
    isLoading: false,
  });
};
export const RemoveCompanyContactFailure = (
  state: JID_CompanyContactListState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};
