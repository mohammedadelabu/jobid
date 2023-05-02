import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RoleAndPermissionService {
  /* LOCAL TEST API */
  localBaseUrl = ' http://localhost:3000/';
  adminRoleListUrl = this.localBaseUrl + 'adminRoleList';

  //
  constructor(private _http: HttpClient) {}

  GetModuleList() {
    return moduleList;
  }

  GetRoleList() {
    return role;
  }

  /* LOCAL API REQUESTS */
  GetAdminRoleList() {
    return this._http.get(this.adminRoleListUrl);
  }

  GetAdminRoleDetails(RoleId: string) {
    return this._http.get(`${this.adminRoleListUrl}/${RoleId}`);
  }

  CreateAdminRole(Payload: any) {
    return this._http.post(`${this.adminRoleListUrl}`, Payload);
  }

  UpdateAdminRole(Payload:any){
    return this._http.put(`${this.adminRoleListUrl}/${Payload?.id}`, Payload);
  }
}

export const role: any[] = [
  {
    id: '1',
    name: 'Super Admin',
    url: '/recruiter/settings/roles-and-permission/super-admin',
  },
  {
    id: '2',
    name: 'Recruitment Admin',
    url: '/recruiter/settings/roles-and-permission/recruitment-admin',
  },
  {
    id: '3',
    name: 'Recruiter',
    url: '/recruiter/settings/roles-and-permission/recruiter',
  },
  {
    id: '4',
    name: 'Sales Admin',
    url: '/recruiter/settings/roles-and-permission/sales-admin',
  },
  {
    id: '5',
    name: 'Sales',
    url: '/recruiter/settings/roles-and-permission/sales',
  },
  {
    id: '6',
    name: 'Partners',
    url: '/recruiter/settings/roles-and-permission/partners',
  },
  {
    id: '7',
    name: 'Client Admin',
    url: '/recruiter/settings/roles-and-permission/client-admin',
  },
];

export const moduleList: any[] = [
  // {
  //   RegionName: 'string',
  //   ModuleName: 'string',
  //   CreatedAt: '2022-09-22T23:02:47.855Z',
  //   CreatedBy: 'string',
  //   Permission: {
  //     Create: false,
  //     Delete: false,
  //     Update: false,
  //     View: false,
  //   },
  // },
  {
    ModuleName: 'Candidate',
    Permission: {
      Create: false,
      Delete: false,
      Update: false,
      View: false,
    },
  },
  {
    ModuleName: 'Company',
    Permission: {
      Create: false,
      Delete: false,
      Update: false,
      View: false,
    },
  },
  {
    ModuleName: 'Project management',
    Permission: {
      Create: false,
      Delete: false,
      Update: false,
      View: false,
    },
  },
  {
    ModuleName: 'Accounting',
    Permission: {
      Create: false,
      Delete: false,
      Update: false,
      View: false,
    },
  },
  {
    ModuleName: 'Recruitment',
    Permission: {
      Create: false,
      Delete: false,
      Update: false,
      View: false,
    },
  },
  {
    ModuleName: 'Invoice',
    Permission: {
      Create: false,
      Delete: false,
      Update: false,
      View: false,
    },
  },
  {
    ModuleName: 'Payroll',
    Permission: {
      Create: false,
      Delete: false,
      Update: false,
      View: false,
    },
  },
  {
    ModuleName: 'Wallet',
    Permission: {
      Create: false,
      Delete: false,
      Update: false,
      View: false,
    },
  },
];
