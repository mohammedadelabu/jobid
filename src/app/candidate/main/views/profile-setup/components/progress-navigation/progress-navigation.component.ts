import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ProfileSetupProgressNavigationService,
  progressNav,
} from 'src/app/services/profile-setup-progress-navigation.service';

@Component({
  selector: 'app-progress-navigation',
  templateUrl: './progress-navigation.component.html',
  styleUrls: ['./progress-navigation.component.scss'],
})
export class ProgressNavigationComponent implements OnInit {
  progressNavigation: progressNav[] = [];
  // progressNavigation = [
  //   {
  //     name: 'Personal profile',
  //     navLink: 'personal-profile',
  //     isDone: true,
  //     isActive: false,
  //   },
  //   {
  //     name: 'Work history',
  //     navLink: 'work-history',
  //     isDone: false,
  //     isActive: false,
  //   },
  // ];
  constructor(
    private _router: Router,
    private _profileSetupProgressNavigationSvc: ProfileSetupProgressNavigationService
  ) {}

  ngOnInit(): void {
    this._profileSetupProgressNavigationSvc.progressNavigationBehaviourSubj.subscribe(
      {
        next: (response: any) => {
          if (response) {
            
            this.progressNavigation = response;
          }
        },
        error: (err: any) => {
          
        },
      }
    );
  }

  onRoute(NavLink: any) {
    this._router.navigate([`candidate/profile-setup${NavLink}`]);
  }
}
