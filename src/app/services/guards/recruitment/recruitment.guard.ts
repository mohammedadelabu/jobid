import { Injectable } from '@angular/core';
import { CanActivateChild, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {
  AdminRoleAndPermissionService,
  RoleModule,
} from '../../admin-role-and-permission.service';

@Injectable({
  providedIn: 'root',
})
export class RecruitmentGuard implements CanActivateChild {
  constructor(
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService,
    private router: Router
  ) {}

  canActivateChild():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return (
      this._adminRoleAndPermissionSvc.GetUserPermittedRoleModules(
        RoleModule.RECRUITMENT
      ) || this.router.createUrlTree(['/recruiter/dashboard'])
    );
  }
}
