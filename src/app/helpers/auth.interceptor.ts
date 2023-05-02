// import { Injectable } from '@angular/core';
// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor,
//   HttpEventType,
//   HttpErrorResponse,
// } from '@angular/common/http';
// import {
//   BehaviorSubject,
//   filter,
//   Observable,
//   tap,
//   switchMap,
//   take,
//   catchError,
//   throwError,
// } from 'rxjs';
// import { AuthenticationService } from '../services/authentication.service';
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   private IsRefreshing = false;
//   private RefreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
//     null
//   );
//   constructor(
//     private _authenticationService: AuthenticationService,
//     private _router: Router
//   ) {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     if (this._authenticationService.isLogin()) {
//       const token: any = this._authenticationService.getToken();
//       request = this.AddToken(request, token);
//     }
//     return next.handle(request).pipe(
//       tap((event: any) => {
//         if (event.type === HttpEventType.Response) {
//           console.log('Response', event.statusText);
//         }
//       }),
//       catchError((err) => {
//         console.log('Error', err);
//         if (
//           err instanceof HttpErrorResponse &&
//           (err.status === 401 || err.status === 400)
//         ) {
//           return this._authenticationService.GenerateRefreshToken().pipe(
//             switchMap((res: any) => {
//               console.log('res: ', res);
//               console.log('AccessToken: ', res?.AccessToken);
//               localStorage.setItem('token', res.AccessToken);
//               localStorage.setItem('RefreshToken', res.RefreshToken);
//               return next.handle(this.AddToken(request, res.AccessToken));
//             })
//           );
//         }
//         return throwError(() => err);
//       })
//     );
//   }

//   AddToken(request: HttpRequest<any>, token: string) {
//     return request.clone({
//       setHeaders: { Authorization: `Bearer ${token}` },
//     });
//   }

//   private Handle401Error(request: HttpRequest<any>, next: HttpHandler) {
//     if (!this.IsRefreshing) {
//       this.IsRefreshing = true;
//       this.RefreshTokenSubject.next(null);

//       return this._authenticationService
//         .RefreshToken(this._authenticationService.getRefreshToken())
//         .pipe(
//           switchMap((token: any) => {
//             this.IsRefreshing = false;
//             // this.RefreshTokenSubject.next(token.jwt);
//             // return next.handle(this.AddToken(request, token.jwt));
//             this.RefreshTokenSubject.next(token);
//             return next.handle(this.AddToken(request, token));
//           })
//         );
//     } else {
//       return this.RefreshTokenSubject.pipe(
//         filter((token) => token != null),
//         take(1),
//         switchMap((jwt: any) => {
//           return next.handle(this.AddToken(request, jwt));
//         })
//       );
//     }
//   }
// }



import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  BehaviorSubject,
  filter,
  Observable,
  tap,
  switchMap,
  take,
  catchError,
  throwError,
} from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private IsRefreshing = false;
  private RefreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  constructor(
    private _authenticationService: AuthenticationService,
    private _router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this._authenticationService.isLogin()) {
      const token: any = this._authenticationService.getToken();
      request = this.AddToken(request, token);
    }
    return next.handle(request).pipe(
      tap((event: any) => {
        if (event.type === HttpEventType.Response) {
          console.log('Response', event.statusText);
        }
      }),
      catchError((err) => {
        console.log('Error', err);
        if (
          err instanceof HttpErrorResponse &&
          (err.status === 401 || err.status === 400)
        ) {
          console.warn("status: ", err?.status)
          console.warn("request: ", request)
          return this.Handle401Error(request, next);
        }
        return throwError(() => err);
      })
    );
  }

  AddToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });
  }

  private Handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.IsRefreshing) {
      this.IsRefreshing = true;
      this.RefreshTokenSubject.next(null);

      return this._authenticationService
        .RefreshToken(this._authenticationService.getRefreshToken())
        .pipe(
          switchMap((token: any) => {
            console.warn("token: ", token)
            this.IsRefreshing = false;
            // this.RefreshTokenSubject.next(token.jwt);
            // return next.handle(this.AddToken(request, token.jwt));
            this.RefreshTokenSubject.next(token);
            return next.handle(this.AddToken(request, token));
          })
        );
    } else {
      return this.RefreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt: any) => {
          return next.handle(this.AddToken(request, jwt));
        })
      );
    }
  }
}

