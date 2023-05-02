import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger/messenger.service';

@Component({
  selector: 'app-profile-setup',
  templateUrl: './profile-setup.component.html',
  styleUrls: ['./profile-setup.component.scss']
})
export class ProfileSetupComponent implements OnInit {
  isShowSideNav!: boolean;

  constructor(   private _messengerSvc: MessengerService) { }

  ngOnInit(): void {
    this.onSidebarStatus();
  }

  onSidebarStatus() {
    this._messengerSvc.openSideNavitionMessageBehaviorSubjet.subscribe({
      next: (status: boolean) => {
        this.isShowSideNav = status;
      },
    });
  }
}
