import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import {
  AdminRoleAndPermissionService,
  RoleModule,
} from '../../admin-role-and-permission.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectManagementGuard implements CanActivateChild {
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
        RoleModule.PROJECT_MANAGEMENT
      ) || this.router.createUrlTree(['/recruiter/dashboard'])
    );
  }
}
