import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  isOpen!: boolean;
  isShowSideNav!: boolean;
  constructor(private _messengerSvc: MessengerService, public sbService: SidebarService) {}

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
