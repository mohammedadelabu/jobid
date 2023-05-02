import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { IdentityService } from 'src/app/services/identity.service';
import {
  ProfileSetupProgressNavigationService,
  progressNav,
} from 'src/app/services/profile-setup-progress-navigation.service';

@Component({
  selector: 'app-finish-page',
  templateUrl: './finish-page.component.html',
  styleUrls: ['./finish-page.component.scss'],
})
export class FinishPageComponent implements OnInit, OnDestroy {
  progressNavigation: progressNav[] = [
    {
      name: 'Personal profile',
      navLink: 'personal-profile',
      isDone: true,
      isActive: false,
    },
    {
      name: 'Work history',
      navLink: 'work-history',
      isDone: true,
      isActive: false,
    },
    {
      name: 'Education',
      navLink: 'education',
      isDone: true,
      isActive: false,
    },
    {
      name: 'Skills',
      navLink: 'skills',
      isDone: true,
      isActive: false,
    },
    {
      name: 'Projects',
      navLink: 'projects',
      isDone: true,
      isActive: false,
    },
    {
      name: 'Others',
      navLink: 'others',
      isDone: true,
      isActive: false,
    },
  ];
  currentRoute!: string;
  candidateId!: string;
  candidateEmail: any;
  Subscriptions: Subscription[] = [];
  constructor(
    private _profileSetupProgressNavigationSvc: ProfileSetupProgressNavigationService,
    private _router: Router,
    private _indentitySvc: IdentityService
  ) {}

  ngOnInit(): void {
    this.onSendprogressNavigationSubj(this.progressNavigation);
    this.onCheckRouteEvents();
    this.onGetLoggedInUserId();
  }

  onSendprogressNavigationSubj(progressNavigation: progressNav[]) {
    this._profileSetupProgressNavigationSvc.sendProgressNavigationSubj(
      progressNavigation
    );
  }

  onCheckRouteEvents() {
    this.currentRoute = '';
    let subscription = this._router.events.subscribe({
      next: (event: any) => {
        if (event instanceof NavigationStart) {
          // Show progress spinner or progress bar

        }

        if (event instanceof NavigationEnd) {
          // Hide progress spinner or progress bar
          this.currentRoute = event.url;

          this.onSendprogressNavigationSubj(this.progressNavigation);
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

  onGetLoggedInUserId() {
    // this.candidateId = this._indentitySvc.getLoggedInUserId();
    let candidateData = this._indentitySvc.getLoggedInUserData();
    this.candidateId = candidateData.Id;
    this.candidateEmail = candidateData.Email;
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
