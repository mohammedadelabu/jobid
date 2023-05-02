import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AdminUserGuard implements CanActivate {
  canActivate(): boolean {
    if (this._authSvc.isLogin()) {
      let data: any = localStorage.getItem('currentUserData');
      let userData = JSON.parse(data);
      // console.log("auth-administrator.guard.ts: ", userData);
      // if (userData?.Role[0] != 'Administrator') {
        // this._authSvc.logoutUser();
        // this._router.navigate(['/candidate/create-resume/profile']);
        // this._router.navigate(['/administrator/user-dashboard']);
        // this._authSvc.logoutUser();
        // this._router.navigate(['/auth']);
      // }
      return true;
    } else {
      this._authSvc.logoutUser();
      this._router.navigate(['/authenticate-user']);
      return false;
    }
  }
  constructor(
    private _authSvc: AuthenticationService,
    private _router: Router
  ) {}
}
