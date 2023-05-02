import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { LanguageSpokenService } from 'src/app/services/language-spoken.service';

@Component({
  selector: 'app-add-language-spoken',
  templateUrl: './add-language-spoken.component.html',
  styleUrls: ['./add-language-spoken.component.scss'],
})
export class AddLanguageSpokenComponent implements OnInit, OnDestroy {
  laguageSpokenForm!: FormGroup;
  responseMessage: any;
  candidateId: any;
  subscriptions: Subscription[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _languageSpokenSvc: LanguageSpokenService,
    private _router: Router,
    private _editCandidateCvSvc: EditCandidateCvService
  ) {}

  ngOnInit(): void {
    this.onGetCandidateId();
    this.buildLanguageSpokenForm();
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    
  }

  /* LANGUAGE SPOKEN */
  buildLanguageSpokenForm() {
    this.laguageSpokenForm = this._formBuilder.group({
      Language: '',
      Proficiency: '',
    });
  }
  saveLanguageSpoken() {
    // this._editedCandidateSvc.getEditedCandidateIdMsg().subscribe((response) => {
    //   console.log('candidate: ', response);
    //   if (response == null) {
    //     this._router.navigate(['/administrator/candidates/']);
    //   } else {
    //     this.candidateId = response;
    //     console.log('candidate id to be edited: ', this.candidateId);
    //     console.log(this.laguageSpokenForm.value);
    //     this._languageSpokenSvc
    //       .addLanguageSpoken(this.candidateId, this.laguageSpokenForm.value)
    //       .subscribe((response: any) => {
    //         if (response) {
    //           
    //           this.responseMessage = response.Msg;
    //           console.log('Language added!', response);
    //           setTimeout(() => {
    //             this.laguageSpokenForm.reset();
    //             this._languageSpokenSvc.sendAddBehaviouralMsg(false);
    //           }, 2500);
    //         }
    //       });
    //   }
    // });

    // 
    let subscription = this._languageSpokenSvc
      .addLanguageSpoken(this.candidateId, this.laguageSpokenForm.value)
      .subscribe((response: any) => {
        if (response) {
          
          this.responseMessage = response.Msg;
          // console.log('Language added!', response);
          setTimeout(() => {
            this.laguageSpokenForm.reset();
            this._languageSpokenSvc.sendAddBehaviouralMsg(false);
          }, 2500);
        }
      });
    this.subscriptions.push(subscription);

    // console.log(this.laguageSpokenForm.value);
    // let userData = this._userSvc.getUserData();
    // this._languageSpokenSvc.addLanguageSpoken(userData.Id, this.laguageSpokenForm.value).subscribe((response:any)=>{
    //   console.log('language spoken response: ', response);
    //   if(response){
    //     this.responseMessage = response.Msg;
    //     setTimeout(() => {
    //       this._languageSpokenSvc.sendAddBehaviouralMsg(false);
    //     }, 2000);
    //   }
    // })
  }
  cancelForm() {
    this._languageSpokenSvc.sendAddBehaviouralMsg(false);
  }

  

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
