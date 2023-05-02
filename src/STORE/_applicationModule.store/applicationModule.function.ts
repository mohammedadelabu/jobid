// **************

import { tassign } from 'tassign';
import { JID_ApplicationModuleState } from './applicationModule.store';

// FETCH ROLE LIST
export const FetchApplicationModule = (
  state: JID_ApplicationModuleState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchApplicationModuleSuccess = (
  state: JID_ApplicationModuleState,
  action: any
) => {
  return tassign(state, {
    applicationModules: action?.payload,
    isLoading: false,
  });
};
export const FetchApplicationModuleFailure = (
  state: JID_ApplicationModuleState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// ADD APPLICATION MODULE
export const AddApplicationModule = (
  state: JID_ApplicationModuleState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const AddApplicationModuleSuccess = (
  state: JID_ApplicationModuleState,
  action: any
) => {
  //   return tassign(state, {
  //     adminRoles: action?.payload,
  //     isLoading: false,
  //   });
  var newModule = {
    id: state.applicationModules?.length + 1,
    ...action.payload,
    // RoleModules: [],
  };
  // var newModule = { id: action.todo.id, title: action.todo.title };

  return tassign(state, {
    applicationModules: state.applicationModules.concat(newModule),
    isLoading: false,
    // lastUpdate: new Date(),
  });
};
export const AddApplicationModuleFailure = (
  state: JID_ApplicationModuleState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// UPDATE APPLICATION MODULE
export const UpdateApplicationModule = (
  state: JID_ApplicationModuleState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};

export const UpdateApplicationModuleSuccess = (
  state: JID_ApplicationModuleState,
  action: any
) => {
  
  // const modifiedList = action.payload;
  var moduleItem = state.applicationModules.find(
    (t: any) => t.Id === action.payload.Id
  );
  // Now, we need to find the position of this item in the array.
  var index = state.applicationModules.indexOf(moduleItem);
  // 
  return tassign(state, {
    applicationModules: [
      ...state.applicationModules.slice(0, index),
      tassign(moduleItem, action.payload),
      ...state.applicationModules.slice(index + 1),
    ],
    isLoading: false,
  });
};

export const UpdateApplicationModuleFailure = (
  state: JID_ApplicationModuleState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// REMOVE APPLICATION MODULE
export const RemoveApplicationModule = (
  state: JID_ApplicationModuleState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const RemoveApplicationModuleSuccess = (
  state: JID_ApplicationModuleState,
  action: any
) => {
  return tassign(state, {
    applicationModules: state.applicationModules.filter(
      (t: any) => t.Id !== action.payload
    ),
    isLoading: false,
  });
};
export const RemoveApplicationModuleFailure = (
  state: JID_ApplicationModuleState,
  action: any
) => {
  return tassign(state, {
    isLoading: false,
    error: action.payload,
  });
};
