import { tassign } from 'tassign';
import { JID_LeadState } from './lead.store';

// FETCH LEADSlIST
export const FetchLeadsList = (state: JID_LeadState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchLeadsListSuccess = (state: JID_LeadState, action: any) => {
  return tassign(state, {
    leadsList: action?.payload,
    isLoading: false,
  });
};
export const FetchLeadsListFailure = (state: JID_LeadState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// ADD LEAD
export const AddLead = (state: JID_LeadState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const AddLeadSuccess = (state: JID_LeadState, action: any) => {
  var newLead = {
    Id: state.leadsList?.Items?.length + 1,
    ...action.payload,
  };
  return tassign(state, {
    leadsList: {
      ...state,
      leadsList: {
        ...state.leadsList,
        Items: state.leadsList?.Items.concat(newLead),
      },
    },
    isLoading: false,
    // lastUpdate: new Date(),
  });
};

export const AddLeadFailure = (state: JID_LeadState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// UPDATE LEAD
export const UpdateLead = (state: JID_LeadState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};

export const UpdateLeadSuccess = (state: JID_LeadState, action: any) => {
  var leadItem = state.leadsList?.Items.find(
    (t: any) => t.Id === action.payload.Id
  );
  // Now, we need to find the position of this item in the array.
  var index = state.leadsList?.Items.indexOf(leadItem);
  return tassign(state, {
    leadsList: {
      ...state.leadsList,
      Items: [
        ...state.leadsList?.Items.slice(0, index),
        tassign(leadItem, action.payload),
        ...state.leadsList?.Items.slice(index + 1),
      ],
    },
    isLoading: false,
  });
};
export const UpdateLeadFailure = (state: JID_LeadState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// REMOVE LEAD
export const RemoveLead = (state: JID_LeadState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};

export const RemoveLeadSuccess = (state: JID_LeadState, action: any) => {
  const Items = state.leadsList?.Items.filter(
    (t: any) => t.Id !== action.payload
  );
  const data = { ...state.leadsList, Items };
  return tassign(state, {
    leadsList: data,
    isLoading: false,
  });
};
export const RemoveLeadFailure = (state: JID_LeadState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// BULK REMOVE LEAD
export const BulkRemoveLead = (state: JID_LeadState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const BulkRemoveLeadSuccess = (state: JID_LeadState, action: any) => {
  let items = action.payload;
  let stateItems: any[] = state.leadsList?.Items;
  const leadsToDeleteSet = new Set(items);
  const newArr = stateItems.filter((namelead) => {
    return !leadsToDeleteSet.has(namelead?.Id);
  });
  return tassign(state, {
    leadsList: { ...state.leadsList, Items: newArr },
    isLoading: false,
  });
};
export const BulkRemoveLeadFailure = (state: JID_LeadState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// IMPORT LEAD FILE
export const ImportLeadFile = (state: JID_LeadState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};

export const ImportLeadFileSuccess = (state: JID_LeadState, action: any) => {
  return tassign(state, {
    importLeadFileRespondMsg: action.payload,
    isLoading: false,
  });
};

export const ImportLeadFileFailure = (state: JID_LeadState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};
