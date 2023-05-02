import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { ExperienceService } from 'src/app/services/experience.service';
import { IdentityService } from 'src/app/services/identity.service';
import {
  ProfileSetupProgressNavigationService,
  progressNav,
} from 'src/app/services/profile-setup-progress-navigation.service';
import { ProfileSetupService } from 'src/app/services/profile-setup.service';

@Component({
  selector: 'app-work-history',
  templateUrl: './work-history.component.html',
  styleUrls: ['./work-history.component.scss'],
})
export class WorkHistoryComponent implements OnInit, OnDestroy {
  isAddExperience!: boolean;
  isUpdateExperience!: boolean;
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
      isDone: false,
      isActive: true,
    },
    {
      name: 'Education',
      navLink: 'education',
      isDone: false,
      isActive: false,
    },
    {
      name: 'Skills',
      navLink: 'skills',
      isDone: false,
      isActive: false,
    },
    {
      name: 'Projects',
      navLink: 'projects',
      isDone: false,
      isActive: false,
    },
    {
      name: 'Others',
      navLink: 'others',
      isDone: false,
      isActive: false,
    },
  ];
  currentRoute!: string;
  candidateId: any;
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
  onSendprogressNavigationSubj(progressNavigation: progressNav[]) {
    this._profileSetupProgressNavigationSvc.sendProgressNavigationSubj(
      progressNavigation
    );
  }

  onCloseIsAddExperience() {
    this.isAddExperience = false;
  }

  onCloseIsUpdateExperience() {
    this.isUpdateExperience = false;
  }

  onGetLoggedInUserId() {
    this.candidateId = this._indentitySvc.getLoggedInUserId();
  }
  goBack() {
    history.back();
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
