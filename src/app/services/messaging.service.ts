import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Messaging } from '../models/types/messaging';

@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  MessagingUrl = environment.baseUrl + 'api/Messaging/';
  AddMessagingUrl = this.MessagingUrl + 'AddMessaging/';
  GetMessagingUrl = this.MessagingUrl + 'GetMessaging/';
  UpdateMessagingUrl = this.MessagingUrl + 'UpdateMessaging/';
  RemoveMessagingUrl = this.MessagingUrl + 'RemoveMessaging/';
  constructor(private _http: HttpClient) {}

  postMessage(Payload: Messaging) {
    return this._http.post(`${this.AddMessagingUrl}/${Payload.UserId}`, Payload);
  }

  getMessages(UserId:string) {
    return this._http.get(`${this.GetMessagingUrl}${UserId}`);
  }
}
