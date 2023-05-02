import { tassign } from 'tassign';
import { JID_AdminRoleAndPermissionState } from './adminRoleAndPermission.store';

// FETCH ROLE LIST
export const FetchRoleList = (
  state: JID_AdminRoleAndPermissionState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchRoleListSuccess = (
  state: JID_AdminRoleAndPermissionState,
  action: any
) => {
  return tassign(state, {
    adminRoles: action?.payload,
    isLoading: false,
  });
};
export const FetchRoleListFailure = (
  state: JID_AdminRoleAndPermissionState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// FETCH ROLE DETAILS
export const FetchRoleDetails = (
  state: JID_AdminRoleAndPermissionState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const FetchRoleDetailsSuccess = (
  state: JID_AdminRoleAndPermissionState,
  action: any
) => {
  return tassign(state, {
    adminRoleAdminRolesDetails: action?.payload,
    isLoading: false,
  });
};
export const FetchRoleDetailsFailure = (
  state: JID_AdminRoleAndPermissionState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// ADD ADMIN ROLE
export const AddAdminRole = (
  state: JID_AdminRoleAndPermissionState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const AddAdminRoleSuccess = (
  state: JID_AdminRoleAndPermissionState,
  action: any
) => {
  //   return tassign(state, {
  //     adminRoles: action?.payload,
  //     isLoading: false,
  //   });
  var newRole = {
    id: state.adminRoles?.length + 1,
    ...action.payload,
    RoleModules: [],
  };
  // var newRole = { id: action.todo.id, title: action.todo.title };

  return tassign(state, {
    adminRoles: state.adminRoles.concat(newRole),
    isLoading: false,
    // lastUpdate: new Date(),
  });
};
export const AddAdminRoleFailure = (
  state: JID_AdminRoleAndPermissionState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// REMOVE ADMIN ROLE
export const RemoveAdminRole = (
  state: JID_AdminRoleAndPermissionState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const RemoveAdminRoleSuccess = (
  state: JID_AdminRoleAndPermissionState,
  action: any
) => {
  return tassign(state, {
    adminRoles: state.adminRoles.filter((t: any) => t.Id !== action.payload),
    isLoading: false,
  });
};
export const RemoveAdminRoleFailure = (
  state: JID_AdminRoleAndPermissionState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};

// ADD APPLICATION MODULE TO ROLE
export const AddApplicationModuleToRoleRole = (
  state: JID_AdminRoleAndPermissionState,
  action: any
) => {
  return tassign(state, {
    isLoading: true,
  });
};
export const AddApplicationModuleToRoleRoleSuccess = (
  state: JID_AdminRoleAndPermissionState,
  action: any
) => {
  let module = {
    Id: '00000000-0000-0000-0000-000000000000',
    ClientRoleId: '',
    RoleModuleId: action.payload?.Id,
    RoleModule: {
      Id: action.payload?.Id,
      RegionName: action.payload?.ModuleName,
      ModuleName: action.payload?.ModuleName,
      CreatedAt: action.payload?.CreatedAt,
      CreatedBy: action.payload?.CreatedBy,
      Permission: {
        Id: '',
        Create: false,
        Delete: false,
        Update: false,
        View: false,
        RoleModuleId: action.payload?.Id,
      },
      ClientRoleRoleModules: [],
    },
  };
  return tassign(state, {
    adminRoleAdminRolesDetails: {
      ...state.adminRoleAdminRolesDetails,
      ClientRoleRoleModules:
        state.adminRoleAdminRolesDetails.ClientRoleRoleModules.concat(module),
    },

    isLoading: false,
    // lastUpdate: new Date(),
  });
};
export const AddApplicationModuleToRoleRoleFailure = (
  state: JID_AdminRoleAndPermissionState,
  action: any
) => {
  return tassign(state, {
    error: action.payload,
    isLoading: false,
  });
};
