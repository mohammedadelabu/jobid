import {
  ADD_ADMIN_ROLE,
  ADD_ADMIN_ROLE_ERROR,
  ADD_ADMIN_ROLE_SUCCESS,
  ADD_APPLICATION_MODULE_TO_ROLE,
  ADD_APPLICATION_MODULE_TO_ROLE_ERROR,
  ADD_APPLICATION_MODULE_TO_ROLE_SUCCESS,
  FETCH_ADMIN_ROLE_DETAILS,
  FETCH_ADMIN_ROLE_DETAILS_ERROR,
  FETCH_ADMIN_ROLE_DETAILS_SUCCESS,
  FETCH_ADMIN_ROLE_LIST,
  FETCH_ADMIN_ROLE_LIST_ERROR,
  FETCH_ADMIN_ROLE_LIST_SUCCESS,
  REMOVE_ADMIN_ROLE,
  REMOVE_ADMIN_ROLE_ERROR,
  REMOVE_ADMIN_ROLE_SUCCESS,
} from './adminRoleAndPermission.action';
import {
  AddAdminRole,
  AddAdminRoleFailure,
  AddAdminRoleSuccess,
  AddApplicationModuleToRoleRole,
  AddApplicationModuleToRoleRoleFailure,
  AddApplicationModuleToRoleRoleSuccess,
  FetchRoleDetails,
  FetchRoleDetailsFailure,
  FetchRoleDetailsSuccess,
  FetchRoleList,
  FetchRoleListFailure,
  FetchRoleListSuccess,
  RemoveAdminRole,
  RemoveAdminRoleFailure,
  RemoveAdminRoleSuccess,
} from './adminRoleAndPermission.function';
import {
  INITIAL_ADMIN_ROLE_AND_PERMISSION_STATE,
  JID_AdminRoleAndPermissionState,
} from './adminRoleAndPermission.store';

export function AdminRoleAndPermissionReducer(
  state:
    | JID_AdminRoleAndPermissionState
    | any = INITIAL_ADMIN_ROLE_AND_PERMISSION_STATE,
  action: any
): JID_AdminRoleAndPermissionState {
  switch (action.type) {
    // FETCH_ADMIN_ROLE_LIST
    case FETCH_ADMIN_ROLE_LIST:
      return FetchRoleList(state, action);
    case FETCH_ADMIN_ROLE_LIST_SUCCESS:
      return FetchRoleListSuccess(state, action);
    case FETCH_ADMIN_ROLE_LIST_ERROR:
      return FetchRoleListFailure(state, action);
    // FETCH_ADMIN_ROLE_DETAILS
    case FETCH_ADMIN_ROLE_DETAILS:
      return FetchRoleDetails(state, action);
    case FETCH_ADMIN_ROLE_DETAILS_SUCCESS:
      return FetchRoleDetailsSuccess(state, action);
    case FETCH_ADMIN_ROLE_DETAILS_ERROR:
      return FetchRoleDetailsFailure(state, action);
    // ADD_ADMIN_ROLE
    case ADD_ADMIN_ROLE:
      return AddAdminRole(state, action);
    case ADD_ADMIN_ROLE_SUCCESS:
      return AddAdminRoleSuccess(state, action);
    case ADD_ADMIN_ROLE_ERROR:
      return AddAdminRoleFailure(state, action);
    // REMOVE_ADMIN_ROLE
    case REMOVE_ADMIN_ROLE:
      return RemoveAdminRole(state, action);
    case REMOVE_ADMIN_ROLE_SUCCESS:
      return RemoveAdminRoleSuccess(state, action);
    case REMOVE_ADMIN_ROLE_ERROR:
      return RemoveAdminRoleFailure(state, action);
    // ADD_ADMIN_ROLE
    case ADD_APPLICATION_MODULE_TO_ROLE:
      return AddApplicationModuleToRoleRole(state, action);
    case ADD_APPLICATION_MODULE_TO_ROLE_SUCCESS:
      return AddApplicationModuleToRoleRoleSuccess(state, action);
    case ADD_APPLICATION_MODULE_TO_ROLE_ERROR:
      return AddApplicationModuleToRoleRoleFailure(state, action);
  }
  return state;
}
