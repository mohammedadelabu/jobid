import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IdentityService } from 'src/app/services/identity.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { nav, NavItem } from '../../nav';

@Component({
  selector: 'app-new-sidebar',
  templateUrl: './new-sidebar.component.html',
  styleUrls: ['./new-sidebar.component.scss'],
})
export class NewSidebarComponent implements OnInit {
  @select((s) => s.loggedInUserInformation.loggedInUserInformation)
  userInfo$!: Observable<{ FirstName: string; LastName: string }>;
  collapsed!: boolean;
  nav!: NavItem[];
  userRole: any;

  constructor(
    public sbService: SidebarService,
    private _identitySvc: IdentityService,
    private _authSvc: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.sbService.sidebarCollapsed.subscribe({
      next: (collapsed) => (this.collapsed = collapsed),
    });
    this.nav = nav;
    this.getLoggedUser();
  }

  getLoggedUser() {
    let user = this._identitySvc.getLoggedInUserData();
    console.log('New Sidebar', user);
    this.userRole = user?.newRole?.RoleName;
  }

  logoutUser() {
    this._authSvc.logoutUser();
  }

  toggleCollapse() {
    this.sbService.sidebarCollapsed.next(
      !this.sbService.sidebarCollapsed.value
    );
  }

  setActiveSubNav(navItem: NavItem) {
    if (navItem.secondaryNav) {
      this.sbService.secondaryNavMenus.next(navItem);
      this.sbService.openSecondaryNav(navItem.path);
    }
  }
}
