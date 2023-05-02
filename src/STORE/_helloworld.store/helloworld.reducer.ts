import { tassign } from 'tassign';
import {
  ADD_HELLOWORLD,
  ADD_HELLOWORLD_ERROR,
  ADD_HELLOWORLD_SUCCESS,
  FETCH_HELLOWORLDS_LIST,
  FETCH_HELLOWORLDS_LIST_ERROR,
  FETCH_HELLOWORLDS_LIST_SUCCESS,
  REMOVE_HELLOWORLD,
  REMOVE_HELLOWORLD_ERROR,
  REMOVE_HELLOWORLD_SUCCESS,
  UPDATE_HELLOWORLD,
  UPDATE_HELLOWORLD_ERROR,
  UPDATE_HELLOWORLD_SUCCESS,
} from './helloworld.actions';
import { INITIAL_HELLOWORLD_STATE, JID_HelloworldState } from './helloworld.store';

// FETCH helloworldsList
const FetchHelloworldsList = (state: JID_HelloworldState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
const FetchHelloworldsListSuccess = (state: JID_HelloworldState, action: any) => {
  return tassign(state, {
    helloworldsList: action?.payload,
    isLoading: false,
  });
};
const FetchHelloworldsListFailure = (state: JID_HelloworldState, action: any) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// ADD HELLOWORLD

const AddHelloworld = (state: JID_HelloworldState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};

const AddHelloworldSuccess = (state: JID_HelloworldState, action: any) => {
  var newHelloworld = {
    id: state.helloworldsList?.length + 1,
    ...action.payload,
  };
  // var newHelloworld = { id: action.todo.id, title: action.todo.title };
  return tassign(state, {
    helloworldsList: action.payload,
    isLoading: false,
    // lastUpdate: new Date(),
  });
};

const AddHelloworldFailure = (state: JID_HelloworldState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// UPDATE HELLOWORLD
const UpdateHelloworld = (state: JID_HelloworldState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};

const UpdateHelloworldSuccess = (state: JID_HelloworldState, action: any) => {
  var helloworldItem = state.helloworldsList.find((t: any) => t.Id === action.Id);

  var index = state.helloworldsList.indexOf(helloworldItem);
  return tassign(state, {
    helloworldsList: [
      ...state.helloworldsList.slice(0, index),
      // tassign(helloworldItem, { isCompleted: !helloworldItem.isCompleted }),
      tassign(helloworldItem, action.data.payload),
      ...state.helloworldsList.slice(index + 1),
    ],
    isLoading: false,
  });
};


const UpdateHelloworldSomethingSuccess = (state: JID_HelloworldState, action: any) => {
  var leadItem = state.helloworldSomething?.Items.find(
    (t: any) => t.Id === action.payload.Id
  );
  // Now, we need to find the position of this item in the array.
  var index = state.helloworldSomething?.Items.indexOf(leadItem);
  return tassign(state, {
    helloworldSomething: {
      ...state.helloworldSomething,
      arrayItems: [
        ...state.helloworldSomething?.arrayItems.slice(0, index),
        tassign(leadItem, action.payload),
        ...state.helloworldSomething?.arrayItems.slice(index + 1),
      ],
    },
    isLoading: false,
  });
};


const UpdateHelloworldFailure = (state: JID_HelloworldState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

export function HelloworldReducer(
  state: JID_HelloworldState | any = INITIAL_HELLOWORLD_STATE,
  action: any
): JID_HelloworldState {
  switch (action.type) {
    // FETCH_HELLOWORLD_LIST
    case FETCH_HELLOWORLDS_LIST:
      return FetchHelloworldsList(state, action);
    case FETCH_HELLOWORLDS_LIST_SUCCESS:
      return FetchHelloworldsListSuccess(state, action);

    case FETCH_HELLOWORLDS_LIST_ERROR:
      return FetchHelloworldsListFailure(state, action);

    // ADD_HELLOWORLD
    case ADD_HELLOWORLD:
      return AddHelloworld(state, action);
    case ADD_HELLOWORLD_SUCCESS:
      return AddHelloworldSuccess(state, action);
    case ADD_HELLOWORLD_ERROR:
      return AddHelloworldFailure(state, action);

    // UPDATE_HELLOWORLD
    case UPDATE_HELLOWORLD:
      return UpdateHelloworld(state, action);
    case UPDATE_HELLOWORLD_SUCCESS:
      return UpdateHelloworldSuccess(state, action);
    case UPDATE_HELLOWORLD_ERROR:
      return UpdateHelloworldFailure(state, action);

    // REMOVE_HELLOWORLD
    case REMOVE_HELLOWORLD:
      return tassign(state, {
        isLoading: true,
      });

    case REMOVE_HELLOWORLD_SUCCESS:
      return tassign(state, {
        helloworldsList: action.payload,
        isLoading: false,
      });
    case REMOVE_HELLOWORLD_ERROR:
      return tassign(state, {
        error: action.payload,
        isLoading: false,
      });
  }
  return state;
}
// function uPDATEHelloworldFailure(state: any, action: any): JID_HelloworldState {
//   throw new Error('Function not implemented.');
// }
