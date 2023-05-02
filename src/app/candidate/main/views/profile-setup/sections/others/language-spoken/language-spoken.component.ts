import { Component, OnInit } from '@angular/core';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-language-spoken',
  templateUrl: './language-spoken.component.html',
  styleUrls: ['./language-spoken.component.scss'],
})
export class LanguageSpokenComponent implements OnInit {
  isAddLanguageSpoken!: boolean;
  isUpdateLanguageSpoken!: boolean;
  candidateId: any;
  constructor(private _indentitySvc: IdentityService) {}
  ngOnInit(): void {
    this.onGetLoggedInUserId();
  }

  onCloseIsAddLanguageSpoken() {
    this.isAddLanguageSpoken = false;
  }

  onCloseIsUpdateLanguageSpoken() {
    this.isUpdateLanguageSpoken = false;
  }

  onGetLoggedInUserId() {
    this.candidateId = this._indentitySvc.getLoggedInUserId();
  }
  goBack() {
    history.back();
  }
}
