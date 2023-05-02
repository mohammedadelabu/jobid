import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  userEmail: any;
  userId: any;
  loggedInUser: any;
  isShowSideNav!: boolean;
  constructor(
    private _authenticationSvc: AuthenticationService,
    private _messengerSvc: MessengerService
  ) {}

  ngOnInit(): void {
    this.getLogedInUser();
    this.onSidebarStatus();
  }

  onSidebarStatus() {
    this._messengerSvc.openSideNavitionMessageBehaviorSubjet.subscribe({
      next: (status: boolean) => {
        this.isShowSideNav = status;
      },
    });
  }

  // onToggleSidebar() {
  //   this.isShowSideNav = !this.isShowSideNav;
  // }

  getLogedInUser() {
    this.loggedInUser = this._authenticationSvc.getUserData();
    // console.log('loggedInUser: ', this.loggedInUser);
    this.userId = this.loggedInUser?.userId;
    this.userEmail = this.loggedInUser?.userEmail;
  }
}
