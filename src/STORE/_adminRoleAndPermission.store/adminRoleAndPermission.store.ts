export interface JID_AdminRoleAndPermissionState {
    adminRoles: any[];
    adminRoleAdminRolesDetails: any;
    error: any;
    lastUpdate: Date;
    isLoading: boolean;
  }
  
  export const INITIAL_ADMIN_ROLE_AND_PERMISSION_STATE: JID_AdminRoleAndPermissionState = {
    adminRoles: [],
    adminRoleAdminRolesDetails: null,
    error: null,
    lastUpdate: new Date(),
    isLoading: false,
  };
  