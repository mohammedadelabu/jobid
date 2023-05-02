import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  AdminRoleAndPermissionService,
  PermissionName,
  RoleModule,
} from '../../admin-role-and-permission.service';

@Injectable({
  providedIn: 'root',
})
export class UpdateRecruitmentGuard implements CanActivate {
  constructor(
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService,
    private router: Router
  ) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return (
      this._adminRoleAndPermissionSvc.GetModulePermissions(
        RoleModule.RECRUITMENT
      )[PermissionName.Update] ||
      this.router.createUrlTree(['recruiter/employee-management/recruitment'])
    );
  }
}
