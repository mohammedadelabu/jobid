import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger/messenger.service';

@Component({
  selector: 'app-edit-candidate-cv',
  templateUrl: './edit-candidate-cv.component.html',
  styleUrls: ['./edit-candidate-cv.component.scss'],
})
export class EditCandidateCvComponent implements OnInit {
  isShowSideNav!: boolean;

  constructor(private _messengerSvc: MessengerService) {}

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
