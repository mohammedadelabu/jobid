import { id } from 'date-fns/locale';
import { tassign } from 'tassign';
import { JID_DealState } from './deal.store';

// FETCH dEALSlIST
export const FetchDealList = (state: JID_DealState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchDealListSuccess = (state: JID_DealState, action: any) => {
  return tassign(state, {
    dealsList: action?.payload,
    isLoading: false,
  });
};
export const FetchDealListFailure = (state: JID_DealState, action: any) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// ADD DEAL

export const AddDeal = (state: JID_DealState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};

export const AddDealSuccess = (state: JID_DealState, action: any) => {
  var newDeal = {
    id: state.dealsList?.length + 1,
    ...action.payload,
  };
  // var newDeal = { id: action.todo.id, title: action.todo.title };
  return tassign(state, {
    dealsList: action.payload.deals,
    isLoading: false,
    // lastUpdate: new Date(),
  });
};

export const AddDealFailure = (state: JID_DealState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// UPDATE DEAL
export const UpdateDeal = (state: JID_DealState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const UpdateDealSuccess = (state: JID_DealState, action: any) => {
  return tassign(state, {
    dealDetails: { ...state.dealDetails, Companies: action.payload },
    isLoading: false,
  });
};
export const UpdateDealFailure = (state: JID_DealState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// REMOVE DEAL
export const RemoveDeal = (state: JID_DealState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const RemoveDealSuccess = (state: JID_DealState, action: any) => {
  // const dealStage = state.dealsList.find(
  //   (st) => st.id === action.payload.stage.id
  // );
  const newState = state.dealsList.map((dl) => {
    if (dl.id === action.payload.stage.id) {
      dl.deals = dl.deals.filter(
        (deal: any) => {
          return deal.Id !== action.payload.dealId
        }
      );
    }
    return dl;
  });
  return { ...state, dealsList: newState };
  // // console.log('Payload', action.payload)
  // const stage = state.dealsList?.find(
  //   (s: any) => s.id == action?.payload.stage.id
  // );
  // // console.log('Stage', stage)
  // const deals_ = stage.deals.filter((d: any) => d.Id != action?.payload.dealId);
  // // console.log('Deals', deals_)

  // const newDealsListState = state.dealsList?.find(
  //   (ds: any) => ds.id == stage.id
  // );
  // let again = { ...newDealsListState, deals: deals_ };
  // let x = state.dealsList.filter((t: any) => t.id != again.id);
  // return tassign(state, {
  //   // dealsList: state.dealsList.filter((t: any) => t.Id != action.payload),
  //   // dealsList: [...x, again],
  //   isLoading: false,
  // });
};
export const RemoveDealFailure = (state: JID_DealState, action: any) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// CONVERT LEAD TO DEAL
export const ConvertLeadToDeal = (state: JID_DealState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const ConvertLeadToDealSuccess = (state: JID_DealState, action: any) => {
  return tassign(state, {
    converLeadToDeal: action.payload,
    isLoading: false,
  });
};
export const ConvertLeadToDealFailure = (state: JID_DealState, action: any) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// FETCH DEAL DETAILS
export const FetchDealDetails = (state: JID_DealState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchDealDetailsSuccess = (state: JID_DealState, action: any) => {
  return tassign(state, {
    dealDetails: action.payload,
    dealStage: action.payload?.DealStage,
    isLoading: false,
  });
};
export const FetchDealDetailsFailure = (state: JID_DealState, action: any) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// UPDATE DEAL STAGE
export const UpdateDealStage = (state: JID_DealState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const UpdateDealStageSuccess = (state: JID_DealState, action: any) => {
  // console.warn("action.payload: ", action.payload)
  let dealId = action.payload?.dealId;
  let x = action.payload.previousStage;
  let newList;
  if (x) {
    let previousParent = state.dealsList.find((list: any) => list?.stage === x);
    // console.group("previousParent: ", previousParent)
    state.dealsList.forEach((stage) => {
      if (stage.stage == previousParent?.stage) {
        // console.log("stage!!!: ", stage);
        let v = stage.deals.filter((t: any) => t.Id !== dealId);
        // console.log("v>>>>: ", v);
        stage.deals = v;
        return stage;
      }
    });
    // console.log("state.dealsList##: ", state.dealsList);
    newList = state.dealsList;
  }

  return tassign(state, {
    dealsList: newList,
    dealStage: action.payload?.stage,
    isLoading: false,
  });
};
export const UpdateDealStageFailure = (state: JID_DealState, action: any) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// FetchDealCompanyDetails
export const FetchDealCompanyDetails = (state: JID_DealState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchDealCompanyDetailsSuccess = (
  state: JID_DealState,
  action: any
) => {
  return tassign(state, {
    dealCompanyDetails: action.payload,
    isLoading: false,
  });
};
export const FetchDealCompanyDetailsFailure = (
  state: JID_DealState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// UPDATE DEAL COMPANY DETAILS
export const UpdateDealCompanyDetails = (state: JID_DealState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const UpdateDealCompanyDetailsSuccess = (
  state: JID_DealState,
  action: any
) => {
  return tassign(state, {
    dealCompanyDetails: action.payload,
    isLoading: false,
  });
};
export const UpdateDealCompanyDetailsFailure = (
  state: JID_DealState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// FetchDealPrimaryContactDetails
export const FetchDealPrimaryContactDetails = (
  state: JID_DealState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchDealPrimaryContactDetailsSuccess = (
  state: JID_DealState,
  action: any
) => {
  return tassign(state, {
    dealPrimaryContactDetails: action.payload,
    isLoading: false,
  });
};
export const FetchDealPrimaryContactDetailsFailure = (
  state: JID_DealState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// FetchDealSecondaryContactList
export const FetchDealSecondaryContactList = (
  state: JID_DealState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchDealSecondaryContactListSuccess = (
  state: JID_DealState,
  action: any
) => {
  return tassign(state, {
    dealSecondaryContactList: action.payload,
    isLoading: false,
  });
};
export const FetchDealSecondaryContactListFailure = (
  state: JID_DealState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// UpdateDealSecondaryContact
export const UpdateDealSecondaryContact = (
  state: JID_DealState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const UpdateDealSecondaryContactSuccess = (
  state: JID_DealState,
  action: any
) => {
  let itemList = state.dealSecondaryContactList.filter(
    (t: any) => t.Id !== action.payload?.Id
  );
  return tassign(state, {
    dealSecondaryContactList: [...itemList, action.payload],
    isLoading: false,
  });
};
export const UpdateDealSecondaryContactFailure = (
  state: JID_DealState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// RemoveDealSecondaryContact
export const RemoveDealSecondaryContact = (
  state: JID_DealState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const RemoveDealSecondaryContactSuccess = (
  state: JID_DealState,
  action: any
) => {
  return tassign(state, {
    dealSecondaryContactList: state.dealSecondaryContactList.filter(
      (t: any) => t.Id !== action.payload
    ),
    isLoading: false,
  });
};
export const RemoveDealSecondaryContactFailure = (
  state: JID_DealState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// AddDealSecondaryContact
export const AddDealSecondaryContact = (state: JID_DealState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const AddDealSecondaryContactSuccess = (
  state: JID_DealState,
  action: any
) => {
  // var newTodo = { id: state.todos.length + 1, title: action.title };
  var newContact = {
    id: state.dealSecondaryContactList.length + 1,
    ...action.payload,
  };
  return tassign(state, {
    // Instead of the push() method, we use the concat() method because the former mutates
    // the original array, whereas the latter returns a new array.
    dealSecondaryContactList: state.dealSecondaryContactList.concat(newContact),
    isLoading: false,
  });
};
export const AddDealSecondaryContactFailure = (
  state: JID_DealState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};
