import { Component, OnInit } from '@angular/core';
import { NotificationMessagesService } from 'src/app/services/notification-messages.service';

@Component({
  selector: 'app-notification-messages',
  templateUrl: './notification-messages.component.html',
  styleUrls: ['./notification-messages.component.scss'],
})
export class NotificationMessagesComponent implements OnInit {
  messages!: string[];

  constructor(private _notificationMsgSvc: NotificationMessagesService) {}

  ngOnInit(): void {
    this.onGetNotificationMessages();
  }

  onGetNotificationMessages() {
    this.messages = this._notificationMsgSvc.messages;
  }
}
