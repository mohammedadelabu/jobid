import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { getSubNavigation, NavItem } from '../recruiter/main/nav';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  sidebarCollapsed = new BehaviorSubject<boolean>(false);
  secSidebarCollapsed = new BehaviorSubject<boolean>(true);
  fullWidth = 320;
  collapsedWidth = 120;
  secCollapsedWidth = 0;
  sidebarWidth = new BehaviorSubject<number>(this.fullWidth);
  subnavWidth = new BehaviorSubject<number>(this.fullWidth);
  activeSecondaryNav = new BehaviorSubject<string>('');
  secondaryNavMenus = new BehaviorSubject<NavItem | undefined>(undefined);

  constructor() {
    this.sidebarCollapsed.subscribe({
      next: (collapsed) => {
        if (collapsed) {
          this.sidebarWidth.next(this.collapsedWidth);
        } else {
          this.sidebarWidth.next(this.fullWidth);
        }
      },
    });
    this.secSidebarCollapsed.subscribe({
      next: (collapsed) => {
        if (collapsed) {
          this.subnavWidth.next(this.secCollapsedWidth);
        } else {
          this.subnavWidth.next(this.fullWidth);
        }
      },
    });
  }

  openSecondaryNav(path: string) {
    this.sidebarCollapsed.next(true);
    this.secSidebarCollapsed.next(false);
    this.secondaryNavMenus.next(getSubNavigation(path));
  }

  closeSecondaryNav() {
    this.sidebarCollapsed.next(false);
    this.secSidebarCollapsed.next(true);
  }
}
