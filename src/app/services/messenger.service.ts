import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessengerService {
  overlayBehaviourSbj = new BehaviorSubject(false);
  sidePopupBehaviourSbj = new BehaviorSubject(false);

  constructor() {}

  setOverlayBehaviourSbj(msg: any) {
    return this.overlayBehaviourSbj.next(msg);
  }

  getOverlayBehaviourSbj() {
    return this.overlayBehaviourSbj.asObservable();
  }

  setSidePopupBehaviourSbj(msg: any) {
    return this.sidePopupBehaviourSbj.next(msg);
  }

  getSidePopupBehaviourSbj() {
    return this.sidePopupBehaviourSbj.asObservable();
  }

  /* DATE FORMATTER ENDS */
  reformatDate(dateStr: any) {
    let dArray = dateStr.split('-');
    // console.log(dArray[1] + '/' + dArray[0]);
    return dArray[1] + '/' + dArray[0];
  }

  formatConvertion(dateStr: any) {
    let dArray = dateStr.split('/');
    // console.log(dArray[1] + '-' + dArray[0]);
    return dArray[1] + '-' + dArray[0];
  }

  reformatFullDate(dateStr: any) {
    let dArray = dateStr.split('-');
    // console.log(dArray[1] + '/' + dArray[0]);
    return dArray[2] + '/' + dArray[1] + '/' + dArray[0];
  }
  formatConvertionFullDate(dateStr: any) {
    let dArray = dateStr.split('/');
    // console.log(dArray[1] + '-' + dArray[0]);
    return dArray[2] + '-' + dArray[1] + '-' + dArray[0];
  }

  /* DATE FORMATTER BEGINS */
}
