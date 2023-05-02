import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileSetupProgressNavigationService {
  progressNavigation: progressNav[] = [
    {
      name: 'Personal profile',
      navLink: 'personal-profile',
      isDone: false,
      isActive: true,
    },
    {
      name: 'Work history',
      navLink: 'work-history',
      isDone: false,
      isActive: false,
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
  progressNavigationBehaviourSubj = new BehaviorSubject<progressNav[]>(
    this.progressNavigation
  );

  constructor() {}

  sendProgressNavigationSubj(Data: progressNav[]) {
    this.progressNavigationBehaviourSubj.next(Data);
  }
}

export interface progressNav {
  name: string;
  navLink: string;
  isDone: boolean;
  isActive: boolean;
}
