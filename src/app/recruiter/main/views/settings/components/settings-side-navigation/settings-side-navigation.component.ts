import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-settings-side-navigation',
  templateUrl: './settings-side-navigation.component.html',
  styleUrls: ['./settings-side-navigation.component.scss'],
})
export class SettingsSideNavigationComponent implements OnInit {
  @Input() navLinks: any;
  SignOutBtnLabel = "Sign out";
  SignOutBtnIconUrl = "../../../../../../../assets/images/icons/arrow-left-circle-green-icon.png"
  navLinks_ = [
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
      name: 'Account Settings',
      url: '/recruiter/settings/account-settings',
      icon: '../../../../../../../assets/images/icons/profile-avatar-icon.svg',
    },
    {
      name: 'Roles & Permissions',
      url: '/recruiter/settings/roles-and-permission/roles/',
      icon: '../../../../../../../assets/images/icons/key-green-icon.png',
    },
    {
      name: 'Modules',
      url: '/recruiter/settings/modules',
      icon: '../../../../../../../assets/images/icons/puzzle-piece-solid.png',
    },
    {
      name: 'Roles',
      url: '/recruiter/settings/roles',
      icon: '../../../../../../../assets/images/icons/user-tag-solid.png',
    },
    { name: 'Branches', url: '/recruiter/settings/branches',
    icon: '../../../../../../../assets/images/icons/branch-building-green-icon.png', },
    { name: 'Users', url: '/recruiter/settings/users',
    icon: '../../../../../../../assets/images/icons/group-avatar-green-icon.png', },
    {
      name: '2 step verification',
      url: '/recruiter/settings/2-step-verification',
      icon: '../../../../../../../assets/images/icons/lock-green-icon.png',
    },
    {
      name: 'Recovery',
      url: '/recruiter/settings/recovery',
      icon: '../../../../../../../assets/images/icons/reset-green-icon.png',
    }
  ];
  constructor(private _authSvc: AuthenticationService) {}

  ngOnInit(): void {}

  
  logoutUser() {
    this._authSvc.logoutUser();
  }
}
