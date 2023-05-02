import { Component, OnDestroy } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import {
  AdminRoleAndPermissionService,
  RoleModule,
} from './services/admin-role-and-permission.service';
import { AuthenticationService } from './services/authentication.service';
import { CompanyService } from './services/company.service';
import { MessengerService } from './services/messenger/messenger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'jobid';
  Subscriptions: Subscription[] = [];

  constructor(
    private _titleSvc: Title,
    private _meta: Meta,
    private _router: Router,
    private _messengerSvc: MessengerService,
    // private _companySvc: CompanyService,
    private _authSvc: AuthenticationService,
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService
  ) {
    this._titleSvc.setTitle('JOBPRO application from Zarttech');
    // this._titleSvc.setTitle('');
    this._meta.addTag({
      name: 'description',
      content: 'Job posting platform for companies and applicants',
    });
    this._meta.addTag({
      name: 'keywords',
      content: '',
    });
  }

  currentRoute = '';
  isShow = true;

  ngOnInit(): void {
    this.onCheckRouteEvents();
    // this._companySvc.LoadCompanyList();

    this._authSvc.LoadUserData();
  }

  onCheckRouteEvents() {
    let subscription = this._router.events.subscribe({
      next: (event: any) => {
        if (event instanceof NavigationStart) {
          // Show progress spinner or progress bar
          //
        }

        if (event instanceof NavigationEnd) {
          // Hide progress spinner or progress bar
          // console.log("event: ", event)
          this.currentRoute = event.url;
          //
          this._messengerSvc.sendOpenSideNavitionMessageBehaviorSubjet(false);
        }

        if (event instanceof NavigationError) {
          // Hide progress spinner or progress bar

          // Present error to user
          // console.log(event.error);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.Subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
