import { tassign } from 'tassign';
import { JID_TodoState } from './todo.store';

// FETCH Todos
export const FetchTodos = (state: JID_TodoState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchTodosSuccess = (state: JID_TodoState, action: any) => {
  return tassign(state, {
    todos: action?.payload,
    isLoading: false,
  });
};
export const FetchTodosFailure = (state: JID_TodoState, action: any) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// ADD DEAL

export const AddTodo = (state: JID_TodoState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};

export const AddTodoSuccess = (state: JID_TodoState, action: any) => {
  var newTodo = {
    id: state.todos?.length + 1,
    ...action.payload,
  };
  // var newDeal = { id: action.todo.id, title: action.todo.title };
  return tassign(state, {
    todos: state.todos.concat(newTodo),
    isLoading: false,
  });
};

export const AddTodoFailure = (state: JID_TodoState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// UPDATE DEAL
export const UpdateTodoIsCompleted = (state: JID_TodoState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const UpdateTodoIsCompletedSuccess = (state: JID_TodoState, action: any) => {
  var newTodo = { id: state.todos.length + 1, ...action?.payload };
  console.log("newTodo: ", newTodo);


  // return tassign(state, {
  //   todos: { ...state.todos, isCompleted:  },
  //   isLoading: false,
  // });
};
export const UpdateTodoIsCompletedFailure = (state: JID_TodoState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// UPDATE DEAL
// export const UpdateDeal = (state: JID_TodoState, action: any) => {
//   return tassign(state, {
//     isLoading: true,
//   });
// };
// export const UpdateDealSuccess = (state: JID_TodoState, action: any) => {
//   return tassign(state, {
//     dealDetails: { ...state.dealDetails, Companies: action.payload },
//     isLoading: false,
//   });
// };
// export const UpdateDealFailure = (state: JID_TodoState, action: any) => {
//   return tassign(state, {
//     error: action.error,
//     isLoading: false,
//   });
// };

// REMOVE DEAL
export const RemoveDeal = (state: JID_TodoState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const RemoveDealSuccess = (state: JID_TodoState, action: any) => {
  const stage = state.todos.find(
    (s: any) => s.id == action?.payload.stage.id
  );
  const deals_ = stage.deals.filter((d: any) => d.Id != action?.payload.dealId);

  const newtodosState = state.todos.find(
    (ds: any) => ds.id == stage.id
  );
  let again = { ...newtodosState, deals: deals_ };
  let x = state.todos.filter((t: any) => t.id != again.id);
  return tassign(state, {
    // todos: state.todos.filter((t: any) => t.Id != action.payload),
    // todos: [...x, again],
    isLoading: false,
  });
};
export const RemoveDealFailure = (state: JID_TodoState, action: any) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};


// FETCH DEAL DETAILS
// export const FetchDealDetails = (state: JID_TodoState, action: any) => {
//   return tassign(state, {
//     isLoading: true,
//   });
// };
// export const FetchDealDetailsSuccess = (state: JID_TodoState, action: any) => {
//   return tassign(state, {
//     dealDetails: action.payload,
//     dealStage: action.payload?.DealStage,
//     isLoading: false,
//   });
// };
// export const FetchDealDetailsFailure = (state: JID_TodoState, action: any) => {
//   return tassign(state, {
//     error: action.payload,
//     isLoading: false,
//   });
// };

// RemoveDealSecondaryContact
// export const RemoveDealSecondaryContact = (
//   state: JID_TodoState,
//   action: any
// ) => {
//   return tassign(state, {
//     isLoading: true,
//   });
// };
// export const RemoveDealSecondaryContactSuccess = (
//   state: JID_TodoState,
//   action: any
// ) => {
//   return tassign(state, {
//     dealSecondaryContactList: state.dealSecondaryContactList.filter(
//       (t: any) => t.Id !== action.payload
//     ),
//     isLoading: false,
//   });
// };
// export const RemoveDealSecondaryContactFailure = (
//   state: JID_TodoState,
//   action: any
// ) => {
//   return tassign(state, {
//     error: action.payload,
//     isLoading: false,
//   });
// };
