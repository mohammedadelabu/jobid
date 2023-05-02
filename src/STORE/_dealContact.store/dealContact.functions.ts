import { tassign } from 'tassign';
import { JID_DealContactListState } from './dealContact.store';

// FETCH CONTACT LIST
export const FetchDealContactList = (
  state: JID_DealContactListState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchDealContactListSuccess = (
  state: JID_DealContactListState,
  action: any
) => {
  console.warn("action?.payload?: ", action?.payload)
  let list:any[] = [];
  if (action?.payload) {
    list = [...action?.payload]
  }

  return tassign(state, {
    contactList: list,
    isLoading: false,
  });
};
export const FetchDealContactListFailure = (
  state: JID_DealContactListState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};


// ADD HELLOWORLD

export const AddDealContact = (state: JID_DealContactListState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};

export const AddDealContactSuccess = (state: JID_DealContactListState, action: any) => {
  console.warn("action.payload: ", action.payload)
  var newContact = {
    Id: state.contactList?.length + 1,
    ...action.payload,
  };
  console.warn("newContact: ", newContact)
  return tassign(state, {
    contactList:
      state.contactList?.concat(newContact),
    isLoading: false
  });
};

export const AddDealContactFailure = (state: JID_DealContactListState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};


// UPDATE CONTACT
export const UpdateDealContact = (state: JID_DealContactListState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const UpdateDealContactSuccess = (
  state: JID_DealContactListState,
  action: any
) => {
  var contactItem = state.contactList?.find(
    (t: any) => t.Id === action.payload.Id
  );
  // Now, we need to find the position of this item in the array.
  var index = state.contactList?.indexOf(contactItem);
  return tassign(state, {
    contactList: [
      ...state.contactList?.slice(0, index),
      tassign(contactItem, action.payload),
      ...state.contactList?.slice(index + 1),
    ],
    isLoading: false,
  });
};
export const UpdateDealContactFailure = (
  state: JID_DealContactListState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};


// REMOVE CONTACT
export const RemoveDealContact = (state: JID_DealContactListState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const RemoveDealContactSuccess = (
  state: JID_DealContactListState,
  action: any
) => {
  const Items = state.contactList?.filter(
    (t: any) => t.Id !== action.payload
  );

  return tassign(state, {
    contactList: Items,
    isLoading: false,
  });
};
export const RemoveDealContactFailure = (
  state: JID_DealContactListState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};
