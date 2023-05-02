import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getModulePermission } from 'src/app/helpers/permissions';
import { roleModulePermission } from 'src/app/helpers/role-module-permission';
import { AdminRoleAndPermissionService } from 'src/app/services/admin-role-and-permission.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { IdentityService } from 'src/app/services/identity.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { CreateBranchLocationComponent } from './branches/create-branch-location/create-branch-location.component';
import { CreateAdminRoleDialogComponent } from './components/create-admin-role-dialog/create-admin-role-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @select((s) => s.loggedInUser.loggedInUser) loggedInUser$: any;
  @select((s) => s.loggedInUser.isLoading) isLoggedInUserLoading$: any;
  @select((s) => s.userByIdEmail.userByIdEmail) userByIdEmail$: any;
  @select((s) => s.userByIdEmail.isLoading) isUserByIdEmailLoading$: any;
  navLinks = [
    // {
    //   name: 'Account Setting',
    //   active: true,
    // },
    // { name: 'Roles & Permmisions' },
    // { name: 'Branches' },
    // { name: 'Users' },
    // { name: '2 step verification' },
    // { name: 'Recovery' },
    // { name: 'Sign out' },

    {
      name: 'Account Setting',
      url: '/recruiter/settings/account-settings',
    },
    {
      name: 'Roles & Permmisions',
      url: '/recruiter/settings/roles-and-permission',
    },
    { name: 'Branches', url: '' },
    { name: 'Users', url: '' },
    { name: '2 step verification', url: '' },
    { name: 'Recovery', url: '' },
    { name: 'Sign out', url: '' },
  ];
  constructor(
    private _identitySvc: IdentityService,
    private _authSvc: AuthenticationService,
    public dialog: MatDialog,
    private _adminRoleAndPermissionSvc: AdminRoleAndPermissionService,
    private _router: Router,
    private sbService: SidebarService
  ) {}

  ngOnInit(): void {
    this.sbService.closeSecondaryNav();
    this.getLoggedInUser();
    this._authSvc.LoadUserData();
    this.getDetails();
    this._adminRoleAndPermissionSvc.LoadModuleList();
    this.getUserPermittedModules();
  }

  getLoggedInUser() {
    this.loggedInUser$.subscribe((data: any) => {
      console.log('data: ', data);
      if (data) {
        this._identitySvc.LoadUserById(data?.Id);
      }
    });
  }

  getUserPermittedModules() {
    let x: any =
      this._adminRoleAndPermissionSvc.GetUserPermittedRoleModules('Placement');

    let userPersmitedModules = x?.userRole?.ClientRoleRoleModules;
    console.log('userPersmitedModules: ', userPersmitedModules);
    let checkPlacement = roleModulePermission(
      'Placement',
      userPersmitedModules
    );
    console.log('checkPlacement: ', checkPlacement);
    let checkPlacement2 = getModulePermission(
      userPersmitedModules,
      'Placement'
    );
    console.log('checkPlacement2: ', checkPlacement2);
  }

  getUserDetails(UserId: string) {
    console.log('UserId: ', UserId);
    this._identitySvc.LoadUserById(UserId);
    // this._identitySvc.getUserById(UserId).subscribe({
    //   next: (response: any) => {
    //
    //   },
    // });
  }

  getDetails() {
    this.userByIdEmail$.subscribe({
      next: (response: any) => {
        this.prefillData(response);
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
  }

  prefillData(Data: any) {
    this.getUserDetails = Data;
    console.log('this.getUserDetails: ', this.getUserDetails);
  }

  openDialog() {
    const dialogRef = this.dialog.open(CreateAdminRoleDialogComponent, {
      width: '100%',
      maxWidth: '550px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  openCreateBranchDialog() {
    const dialogRef = this.dialog.open(CreateBranchLocationComponent, {
      width: '100%',
      maxWidth: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  onRouteCreateBranch() {
    this._router.navigate(['/recruiter/settings/branches/create-branch']);
  }
}
