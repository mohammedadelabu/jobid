import { AfterContentChecked, Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-side-navigation',
  templateUrl: './side-navigation.component.html',
  styleUrls: ['./side-navigation.component.scss'],
})
export class SideNavigationComponent implements OnInit, AfterContentChecked {
  @Input() loggedInUser!: any;
  userEmail: any;
  userId: any;
  constructor(private _authSvc: AuthenticationService) {}

  ngOnInit(): void {}

  ngAfterContentChecked(): void {
    this.userId = this.loggedInUser?.Id;
    this.userEmail = this.loggedInUser?.Email;
  }

  
  logoutUser() {
    this._authSvc.logoutUser();
  }
}
