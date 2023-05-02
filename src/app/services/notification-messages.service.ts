import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationMessagesService {
  messages: string[] = [];
  constructor() {}

  addMessage(message: string) {
    this.messages.push(message);
    return this.messages;
  }

  getMessages() {
    return this.messages;
  }

  clear() {
    this.messages = [];
  }
}
