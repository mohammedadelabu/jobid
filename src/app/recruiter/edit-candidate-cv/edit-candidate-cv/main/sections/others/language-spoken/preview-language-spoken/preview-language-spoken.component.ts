import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { LanguageSpokenService } from 'src/app/services/language-spoken.service';

@Component({
  selector: 'app-preview-language-spoken',
  templateUrl: './preview-language-spoken.component.html',
  styleUrls: ['./preview-language-spoken.component.scss'],
})
export class PreviewLanguageSpokenComponent implements OnInit, OnDestroy {
  languageList!: any;
  infoMessage = 'No language provided yet!';
  candidateId: any;
  subscriptions: Subscription[] = [];

  constructor(
    private _languageSpokenSvc: LanguageSpokenService,
    private _editCandidateCvSvc: EditCandidateCvService,
    private _router: Router // private _userSvc: UserService
  ) {}

  ngOnInit(): void {
    // this.getCandidateLanguages();
    this.onGetCandidateId();
    this.getData();
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    
  }

  getData() {
    let subscription = this._languageSpokenSvc
      .getLanguagesSpoken(this.candidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.languageList = response;
          }
        },
        error: (err: any) => {
          
        },
      });
    this.subscriptions.push(subscription);
  }

  // getCandidateLanguages() {
  //   let userData = this._userSvc.getUserData();
  //   console.log('user data: ', userData.Id);
  //   this._languageSpokenSvc
  //     .getLanguagesSpoken(userData.Id)
  //     .subscribe((response: any) => {
  //       console.log('languages: ', response.Data);
  //       if (response) {
  //         this.languageList = response.Data;
  //       }
  //     });
  // }

  isEditForm(item: any) {
    this._languageSpokenSvc.sendEditBehaviouralMsg(true);
    setTimeout(() => {
      this._languageSpokenSvc.sendLanguageSubjectItem(item);
    }, 1000);
  }

  onDelete(language: any) {
    // console.log('delete Language id', language);
    let confirmation = confirm(
      'Are you sure you want to delete this Language?'
    );
    if (confirmation) {
      let subscription = this._languageSpokenSvc
        .deleteLanguageSpoken(language.Id)
        .subscribe({
          next: (response: any) => {
            if (response) {
              this.getData();
            }
          },
          error: (err: any) => {
            
          },
        });
      this.subscriptions.push(subscription);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
