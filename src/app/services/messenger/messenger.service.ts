import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessengerService {
  messengerSubject = new Subject();
  messengerBehaviouralSubject: BehaviorSubject<null> = new BehaviorSubject(
    null
  );
  changeRouteMessageSubjet: Subject<boolean> = new Subject<boolean>();
  openSideNavitionMessageBehaviorSubjet: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor() {}

  sendSubject(msg: any) {
    return this.messengerSubject.next(msg);
  }
  getSubject() {
    return this.messengerSubject.asObservable();
  }

  sendBehaviouralSubject(msg: any) {
    return this.messengerBehaviouralSubject.next(msg);
  }
  getBehaviouralSubject() {
    return this.messengerBehaviouralSubject.asObservable();
  }

  sendChangeRouteMessageSubjet(msg: boolean) {
    return this.changeRouteMessageSubjet.next(msg);
  }
  sendOpenSideNavitionMessageBehaviorSubjet(msg: boolean) {
    return this.openSideNavitionMessageBehaviorSubjet.next(msg);
  }
}
