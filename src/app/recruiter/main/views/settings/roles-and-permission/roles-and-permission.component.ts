import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { AdminRoleAndPermissionService } from 'src/app/services/admin-role-and-permission.service';
import { RoleAndPermissionService } from 'src/app/services/role-and-permission.service';

@Component({
  selector: 'app-roles-and-permission',
  templateUrl: './roles-and-permission.component.html',
  styleUrls: ['./roles-and-permission.component.scss'],
})
export class RolesAndPermissionComponent implements OnInit {
  @select((s) => s.adminRoles.adminRoles) adminRoles$: any;
  @select((s) => s.adminRoles.isLoading) isAdminRolesLoading$: any;
  roleList: any[] = [];
  constructor(
    private _roleAndPermissionSvc: RoleAndPermissionService,
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService
  ) {}

  ngOnInit(): void {
    // this.getRoleList();
    this.getAdminRoles();
  }

  getRoleList() {
    // this.roleList = this._roleAndPermissionSvc.GetRoleList();
    this._roleAndPermissionSvc.GetAdminRoleList().subscribe({
      next: (response: any) => {
        if (response) {
          this.roleList = response;
        }
      },
      error: (err: any) => {
        if (err) {
        }
      },
    });
  }

  getAdminRoles() {
    this._adminRoleAndPermissionSvc.LoadAdminRoleList();
    this.adminRoles$.subscribe({
      next: (list: any) => {
        console.log('list: ', list);
        this.roleList = list;
      },
      error: (err: any) => {},
    });
  }
}
