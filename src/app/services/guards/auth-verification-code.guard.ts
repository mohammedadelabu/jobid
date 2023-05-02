import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthVerificationCodeGuard implements CanActivate {
  canActivate():boolean {
    if (this._authSvc.isVerified()) {
      return true;
    } else {
      this._router.navigate(['/auth']);
      return false;
    }
  }

  constructor(private _authSvc: AuthenticationService, private _router: Router){}
  
}
