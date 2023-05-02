import { Permission } from '../services/admin-role-and-permission.service';

interface permissionShape {
  Id: string;
  Create: boolean;
  Delete: boolean;
  Update: boolean;
  View: boolean;
  RoleModuleId: string;
}

interface moduleShape {
  Id: string;
  RegionName: string;
  ModuleName: string;
  CreatedAt: string;
  CreatedBy: string;
  Permission: permissionShape;
  ClientRoleRoleModules: Array<any>;
}

export interface roleModulesShape {
  Id: string;
  ClientRoleId: string;
  RoleModuleId: string;
  RoleModule: moduleShape;
}

const data: any = {
  Id: '1099beb0-1f44-46d3-6840-08dab04b3cae',
  RoleName: 'Recruiter',
  CreatedAt: '2022-10-17T17:44:54.1850969',
  CreatedBy: 'Ib.',
  ClientRoleRoleModules: [
    {
      Id: '00000000-0000-0000-0000-000000000000',
      ClientRoleId: '1099beb0-1f44-46d3-6840-08dab04b3cae',
      RoleModuleId: '6fb443cc-2911-44c1-21fc-08dab02acd74',
      RoleModule: {
        Id: '6fb443cc-2911-44c1-21fc-08dab02acd74',
        RegionName: null,
        ModuleName: 'Placement',
        CreatedAt: '2022-10-17T10:51:34.3070397',
        CreatedBy: 'Ib.',
        Permission: {
          Id: '327366c7-95a0-4224-6e2b-08dab02acd74',
          Create: true,
          Delete: false,
          Update: true,
          View: true,
          RoleModuleId: '6fb443cc-2911-44c1-21fc-08dab02acd74',
        },
        ClientRoleRoleModules: [],
      },
    },
    {
      Id: '00000000-0000-0000-0000-000000000000',
      ClientRoleId: '1099beb0-1f44-46d3-6840-08dab04b3cae',
      RoleModuleId: '79066b1c-a5fd-4bf3-2206-08dab02acd74',
      RoleModule: {
        Id: '79066b1c-a5fd-4bf3-2206-08dab02acd74',
        RegionName: null,
        ModuleName: 'Recruitment',
        CreatedAt: '2022-10-17T11:33:06.2961472',
        CreatedBy: 'Ib.',
        Permission: {
          Id: '545d0675-2146-4eab-6e35-08dab02acd74',
          Create: false,
          Delete: false,
          Update: false,
          View: false,
          RoleModuleId: '79066b1c-a5fd-4bf3-2206-08dab02acd74',
        },
        ClientRoleRoleModules: [],
      },
    },
  ],
};

export const getModulePermission = (
  modules: Array<roleModulesShape>,
  activeModule: string
) => {
  const hasPerm = (permission: boolean) => !!permission; // permission may be create, update, delete, or view
  let isExist = false;
  if (modules) {
    const module = modules.find(
      (module) => module.RoleModule.ModuleName === activeModule
    );
    if (!module) return false;
    const { Id, RoleModuleId, ...Permissions } = module.RoleModule.Permission; // remove Id, and RoleModuleId as they are not related to Permissions
    isExist = Object.values(Permissions).some(hasPerm);
  }
  return isExist;
};

// usage, check if the user has any permission in placement and recruitment modules
const hasPlacementPerm = getModulePermission(
  data.ClientRoleRoleModules,
  'Placement'
);
const hasRecruitmentPerm = getModulePermission(
  data.ClientRoleRoleModules,
  'Recruitment'
);

// with the above dataset
console.log(hasPlacementPerm); // True
console.log(hasRecruitmentPerm); // False
