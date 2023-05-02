import { tassign } from 'tassign';
import { JID_TasksState } from './tasks.store';

// FETCH taskList
export const FetchTaskList = (state: JID_TasksState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchTaskListSuccess = (state: JID_TasksState, action: any) => {
  return tassign(state, {
    taskList: action?.payload,
    isLoading: false,
  });
};
export const FetchTaskListFailure = (state: JID_TasksState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// ADD LEAD
export const AddTasks = (state: JID_TasksState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const AddTasksSuccess = (state: JID_TasksState, action: any) => {
  console.group('action: ', action);
  var newTask = {
    Id: state.taskList?.length + 1,
    CreatedDate: new Date().toDateString(),
    ...action.payload,
  };
  return tassign(state, {
    taskList:  [...state.taskList?.concat(newTask)],
    
    // {
    //   ...state,
    //   taskList: {
    //     ...state.taskList,
    //     Items: state.taskList?.concat(newTasks),
    //   },
    // },
    isLoading: false,
    // lastUpdate: new Date(),
  });
};

export const AddTasksFailure = (state: JID_TasksState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};

// UPDATE LEAD
export const UpdateTasks = (state: JID_TasksState, action: any) => {
  return tassign(state, {
    isLoading: true,
  });
};

export const UpdateTasksSuccess = (state: JID_TasksState, action: any) => {
  var tasksItem = state.taskList?.Items.find(
    (t: any) => t.Id === action.payload.Id
  );
  // Now, we need to find the position of this item in the array.
  var index = state.taskList?.Items.indexOf(tasksItem);
  return tassign(state, {
    taskList: {
      ...state.taskList,
      Items: [
        ...state.taskList?.Items.slice(0, index),
        tassign(tasksItem, action.payload),
        ...state.taskList?.Items.slice(index + 1),
      ],
    },
    isLoading: false,
  });
};
export const UpdateTasksFailure = (state: JID_TasksState, action: any) => {
  return tassign(state, {
    error: action.error,
    isLoading: false,
  });
};
