import { tassign } from 'tassign';
import {
  ADD_REQUISITION,
  ADD_REQUISITION_ERROR,
  ADD_REQUISITION_SUCCESS,
  FETCH_REQUISITION_LIST,
  FETCH_REQUISITION_LIST_ERROR,
  FETCH_REQUISITION_LIST_SUCCESS,
  REMOVE_REQUISITION,
  REMOVE_REQUISITION_ERROR,
  REMOVE_REQUISITION_SUCCESS,
  UPDATE_REQUISITION,
  UPDATE_REQUISITION_ERROR,
  UPDATE_REQUISITION_SUCCESS,
} from './requisition.actions';
import {
  INITIAL_REQUISITION_STATE,
  JID_RequisitionState,
} from './requisition.store';

// FETCH REQUISITIONSlIST
const FetchRequisitionsList = (state: JID_RequisitionState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
const FetchRequisitionsListSuccess = (
  state: JID_RequisitionState,
  action: any
) => {
  return tassign(state, {
    requisitionsList: action?.requisitionsList,
    isLoading: false,
  });
};
const FetchRequisitionsListFailure = (
  state: JID_RequisitionState,
  action: any
) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// ADD REQUISITIONT

const AddRequisition = (state: JID_RequisitionState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};

const AddRequisitionSuccess = (state: JID_RequisitionState, action: any) => {
  var newRequisition = {
    id: state.requisitionsList?.length + 1,
    ...action.Payload,
  };
  return tassign(state, {
    // Instead of the push() method, we use the concat() method because the former mutates
    // the original array, whereas the latter returns a new array.
    // requisitionsList: state.requisitionsList.concat(newRequisition),
    isLoading: false,
    // lastUpdate: new Date(),
  });
};

const AddRequisitionFailure = (state: JID_RequisitionState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// UPDATE REQUISITION
const UpdateRequisition = (state: JID_RequisitionState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};

const UpdateRequisitionSuccess = (state: JID_RequisitionState, action: any) => {
  // When modifying an item in an array, we should create a new array, and copy
  // all other item from the source array (except the item to be modified). At the same time
  // we should create a copy of the item to be modified and apply the mutations using tassing.

  // So, first we need to find the item to be modified. Here, we are finding it by it's id.
  const requisitionItem = state.requisitionsList.Items.find(
    (t: any) => t.Id === action.data.Id
  );

  // Now, we need to find the position of this item in the array.
  const index = state.requisitionsList.Items.indexOf(requisitionItem);

  let currentState = { ...state };
  currentState.requisitionsList.Items[index] = tassign(
    currentState.requisitionsList.Items[index],
    action.data.payload
  );
  currentState.isLoading = false;

  return currentState;
};
const UpdateRequisitionFailure = (state: JID_RequisitionState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

export function RequisitionReducer(
  state: JID_RequisitionState | any = INITIAL_REQUISITION_STATE,
  action: any
): JID_RequisitionState {
  switch (action.type) {
    // FETCH_REQUISITION_LIST
    case FETCH_REQUISITION_LIST:
      return FetchRequisitionsList(state, action);
    case FETCH_REQUISITION_LIST_SUCCESS:
      return FetchRequisitionsListSuccess(state, action);

    case FETCH_REQUISITION_LIST_ERROR:
      return FetchRequisitionsListFailure(state, action);

    // ADD_REQUISITION
    case ADD_REQUISITION:
      return AddRequisition(state, action);
    case ADD_REQUISITION_SUCCESS:
      return AddRequisitionSuccess(state, action);
    case ADD_REQUISITION_ERROR:
      return AddRequisitionFailure(state, action);

    // UPDATE_REQUISITION
    case UPDATE_REQUISITION:
      return UpdateRequisition(state, action);
    case UPDATE_REQUISITION_SUCCESS:
      return UpdateRequisitionSuccess(state, action);
    case UPDATE_REQUISITION_ERROR:
      return UpdateRequisitionFailure(state, action);

    // REMOVE_REQUISITION
    case REMOVE_REQUISITION:
      return tassign(state, {
        isLoading: true,
      });

    case REMOVE_REQUISITION_SUCCESS:
      return tassign(state, {
        requisitionsList: state.requisitionsList.filter(
          (t: any) => t.Id !== action.id
        ),
        isLoading: false,
      });
    case REMOVE_REQUISITION_ERROR:
      return tassign(state, {
        error: action.error,
        isLoading: false,
      });
  }
  return state;
}
