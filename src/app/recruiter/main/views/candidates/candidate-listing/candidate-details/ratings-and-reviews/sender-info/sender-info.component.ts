import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-sender-info',
  templateUrl: './sender-info.component.html',
  styleUrls: ['./sender-info.component.scss'],
})
export class SenderInfoComponent implements OnInit, OnDestroy {
  @Input('SenderId') SenderId!: string;
  senderInfo: any;
  subscriptions: Subscription[] = [];

  constructor(private _identitySvc: IdentityService) {}

  ngOnInit(): void {
    this.getSenderInformation();
  }

  getSenderInformation() {
    let subscription = this._identitySvc.getUserById(this.SenderId).subscribe({
      next: (response: any) => {
        if (response) {
          
          if (response) {
            this.senderInfo = response;
          }
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
