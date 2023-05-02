import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CertificationService } from 'src/app/services/certification.service';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss'],
})
export class CertificationComponent implements OnInit, OnDestroy {
  isEdit!: boolean;
  isAdd!: boolean;
  subscriptions: Subscription[] = [];
  constructor(private _certificationSvc: CertificationService) {}

  ngOnInit(): void {
    let subscription1 = this._certificationSvc
      .getEditBehaviouralMsg()
      .subscribe((response) => {
        this.isEdit = response;
      });
    this.subscriptions.push(subscription1);
    let subscription2 = this._certificationSvc
      .getAddBehaviouralMsg()
      .subscribe((response) => {
        this.isAdd = response;
      });
    this.subscriptions.push(subscription2);
  }

  handleIsAdd() {
    this._certificationSvc.sendAddBehaviouralMsg(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
