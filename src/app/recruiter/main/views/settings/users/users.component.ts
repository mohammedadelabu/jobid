import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { AdminRoleAndPermissionService } from 'src/app/services/admin-role-and-permission.service';
import { IdentityService, IsIpLock } from 'src/app/services/identity.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  @select((s) => s.users.userList) userList$: any;
  @select((s) => s.users.isLoading) usersIsLoading$: any;
  @select((s) => s.adminRoles.adminRoles) adminRoles$: any;
  @select((s) => s.adminRoles.isLoading) adminRolesIsLoading$: any;
  selectAllCheckbox = '';
  userList: any;
  selectedUserList: any[] = [];
  totalRecords!: string;
  page = 1;
  count = 0;
  itemsPerPage = 20;
  pageNumber: any;
  searchTerm!:string;
  constructor(
    private _identitySvc: IdentityService,
    private _adminRolePermissionSvc: AdminRoleAndPermissionService
  ) {}

  ngOnInit(): void {
    this.onGetUserList();
    this._adminRolePermissionSvc.LoadAdminRoleList();
  }

  onSearch(searchFilterForm: any) {
    // console.log('searchFilterForm: ', searchFilterForm.value);
    this.onGetUserList();
  }

  onGetUserList() {
    this._identitySvc.LoadUsers(this.itemsPerPage, this.page, this.searchTerm);
    this.userList$.subscribe({
      next: (response: any) => {
        if (response) {
          console.log('Users: ', response);
          this.userList = response?.Items;
          this.itemsPerPage = response?.ItemsPerPage;
          this.pageNumber = response?.page;
          this.totalRecords = response?.totalRecords;
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn('Error: ', err);
        }
      },
    });
  }

  onSelectUsers(item: any) {
    
    if (item.isChecked) {
      if (this.selectedUserList?.length > 0) {
        let isExist = this.selectedUserList.find((f: any) => f.id == item.id);
        console.log('isExist: ', isExist);
        if (isExist) {
          return;
        } else {
          this.selectedUserList.push(item);
        }
      } else {
        this.selectedUserList.push(item);
      }
    } else {
      if (this.selectedUserList.length > 0) {
        let email_list = [...this.selectedUserList];
        this.selectedUserList = email_list.filter((f: any) => f.id != item.id);
      }
    }
    // console.log('this.leadsListArray: ', this.leadsListArray);
    console.log('this.selectedUserList: ', this.selectedUserList);
  }

  onSelectLeadAll() {}

  onToggleIpLock(isIPLock: any) {
    console.log('isIPLock: ', isIPLock);
    const userId = isIPLock.Id;
    const Payload: IsIpLock = {
      isLock: isIPLock.IsIpLock,
    };
    console.log('userId: ', userId);
    
    this._identitySvc.ToggleUserIpLock(userId, Payload).subscribe({
      next: (response: any) => {
        if (response) {
          
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn('Error: ', err);
        }
      },
    });
  }

  onChangeUserRole(Role: any) {
    // console.log('Role: ', Role);
    const userId = Role.Id;
    const Payload = {
      RoleId: Role.RoleName,
    };
    // console.log('userId: ', userId);
    
    this._adminRolePermissionSvc.UpdateUserRole(Payload, userId).subscribe({
      next: (response: any) => {
        if (response) {
          
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn('Error: ', err);
        }
      },
    });
  }

  pageChangeEvent($event: any) {
    this.page = $event;
    this._identitySvc.LoadUsers(this.itemsPerPage, this.page, this.searchTerm);
  }
}

export const applicationUsers = [
  {
    id: 1,
    username: 'Cameron Williamson',
    ipAddress: '102.218.200.2',
    location: 'Nigeria',
    ipLock: false,
    role: 'Recruiter',
    branch: 'Netherlands',
  },
  {
    id: 2,
    username: 'HH. Cameron Williamson',
    ipAddress: '102.218.200.2',
    location: 'Nigeria',
    ipLock: false,
    role: 'Super admin',
    branch: 'Netherlands',
  },
  {
    id: 3,
    username: 'W. Cameron Williamson',
    ipAddress: '102.218.200.2',
    location: 'Nigeria',
    ipLock: true,
    role: 'Recruiter admin',
    branch: 'Netherlands',
  },
  {
    id: 4,
    username: 'D. Cameron Williamson',
    ipAddress: '102.218.200.2',
    location: 'Nigeria',
    ipLock: true,
    role: 'Recruiter',
    branch: 'Netherlands',
  },
];
