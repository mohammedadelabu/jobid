import { Component, OnInit } from '@angular/core';
import { MessengerService } from 'src/app/services/messenger/messenger.service';

@Component({
  selector: 'app-custom-overlay',
  templateUrl: './custom-overlay.component.html',
  styleUrls: ['./custom-overlay.component.scss'],
})
export class CustomOverlayComponent implements OnInit {
  isShow!: boolean;
  isOpen!: boolean;
  constructor(private _messengerSvc: MessengerService) {}

  ngOnInit(): void {
    // this.onRouteChange();
    this.onOpenSideNavigationStatus();
  }

  // onRouteChange() {
  //   this._messengerSvc.changeRouteMessageSubjet.subscribe({
  //     next: (response: boolean) => {
  //       
  //       this.isShow = response;
  //     },
  //     error: (err: any) => {
  //       console.warn('Error: ', err);
  //     },
  //   });
  // }

  onOpenSideNavigationStatus() {
    this._messengerSvc.openSideNavitionMessageBehaviorSubjet.subscribe({
      next: (response: boolean) => {
        // console.log('response: ', response);\
        this.isOpen = response;
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
  }

  onCloseOverlay() {
    this._messengerSvc.sendOpenSideNavitionMessageBehaviorSubjet(false);
    this.onOpenSideNavigationStatus();
  }
}
