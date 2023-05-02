import { Permission } from '../services/admin-role-and-permission.service';

interface permissionShape {
  Id: string;
  Create: boolean;
  Delete: boolean;
  Update: boolean;
  View: boolean;
}

export interface moduleShape {
  Id: string;
  ModuleName: string;
  CreatedAt?: string;
  CreatedBy?: string;
  Permission: permissionShape;
}

const data: any = {
  Id: '6c3fd456-76e3-43b5-f6c4-08dab5bcd9b7',
  RoleName: 'Super admin',
  CreatedAt: '2022-10-24T13:15:17.1020898',
  CreatedBy: 'Onyebuchi',
  RoleModule: [
    {
      Id: 'db57c1e3-0aa3-406e-21fb-08dab02acd74',
      ModuleName: 'Candidates',
      CreatedBy: null,
      Permission: {
        Id: '617ea6aa-eaba-4719-9780-08dab5bcda25',
        Create: false,
        Delete: false,
        Update: false,
        View: false,
      },
    },
    {
      Id: '6fb443cc-2911-44c1-21fc-08dab02acd74',
      ModuleName: 'Placement',
      CreatedBy: null,
      Permission: {
        Id: 'b9ed8a7d-114f-4cbe-9781-08dab5bcda25',
        Create: false,
        Delete: false,
        Update: false,
        View: false,
      },
    },
    {
      Id: 'd2e23cc3-1b17-4c93-21fd-08dab02acd74',
      ModuleName: 'Job Board',
      CreatedBy: null,
      Permission: {
        Id: '80084d8c-2aad-4e4d-9782-08dab5bcda25',
        Create: false,
        Delete: false,
        Update: false,
        View: false,
      },
    },
    {
      Id: '79066b1c-a5fd-4bf3-2206-08dab02acd74',
      ModuleName: 'Recruitment',
      CreatedBy: null,
      Permission: {
        Id: '01382774-dcdc-4cae-9783-08dab5bcda25',
        Create: false,
        Delete: false,
        Update: false,
        View: false,
      },
    },
    {
      Id: 'a256172e-04ea-4b22-2208-08dab02acd74',
      ModuleName: 'Company',
      CreatedBy: null,
      Permission: {
        Id: '5c1bac79-28ed-44e5-9784-08dab5bcda25',
        Create: false,
        Delete: false,
        Update: false,
        View: false,
      },
    },
    {
      Id: '5bce4832-1fb7-4d10-2209-08dab02acd74',
      ModuleName: 'CRM',
      CreatedBy: null,
      Permission: {
        Id: '78771e54-955a-4c76-9785-08dab5bcda25',
        Create: false,
        Delete: false,
        Update: false,
        View: false,
      },
    },
    {
      Id: '6af584a7-e0a4-4cd4-e138-08dab1cedaaa',
      ModuleName: 'Project management',
      CreatedBy: null,
      Permission: {
        Id: '8ee10cdc-dbd1-47e7-9786-08dab5bcda25',
        Create: false,
        Delete: false,
        Update: false,
        View: false,
      },
    },
  ],
};

export const getModulePermission = (
  modules: Array<moduleShape>,
  activeModule: string
) => {
  const hasPerm = (permission: boolean) => !!permission; // permission may be create, update, delete, or view
  let isExist = false;
  if (modules) {
    const module = modules.find((module) => module.ModuleName === activeModule);
    if (!module) return false;
    const { Id, ...Permissions } = module.Permission; // remove Id, and RoleModuleId as they are not related to Permissions
    isExist = Object.values(Permissions).some(hasPerm);
  }
  return isExist;
};

// usage, check if the user has any permission in placement and recruitment modules
const hasPlacementPerm = getModulePermission(data.RoleModule, 'Placement');
const hasRecruitmentPerm = getModulePermission(data.RoleModule, 'Recruitment');

// with the above dataset
// console.log(hasPlacementPerm, 'pppp'); // True
// console.log(hasRecruitmentPerm, 'qqqq'); // False
