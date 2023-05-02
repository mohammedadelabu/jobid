import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageSpokenService } from 'src/app/services/language-spoken.service';

@Component({
  selector: 'app-language-spoken',
  templateUrl: './language-spoken.component.html',
  styleUrls: ['./language-spoken.component.scss'],
})
export class LanguageSpokenComponent implements OnInit, OnDestroy {
  isEdit!: boolean;
  isAdd!: boolean;
  subscriptions: Subscription[] = [];

  constructor(private _languageSpokenSvc: LanguageSpokenService) {}

  ngOnInit(): void {
    let subscription1 = this._languageSpokenSvc
      .getEditBehaviouralMsg()
      .subscribe((response: any) => {
        this.isEdit = response;
      });
    this.subscriptions.push(subscription1);
    let subscription2 = this._languageSpokenSvc
      .getAddBehaviouralMsg()
      .subscribe((response: any) => {
        this.isAdd = response;
        
      });
    this.subscriptions.push(subscription2);
  }
  handleIsAdd() {
    this._languageSpokenSvc.sendAddBehaviouralMsg(true);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
