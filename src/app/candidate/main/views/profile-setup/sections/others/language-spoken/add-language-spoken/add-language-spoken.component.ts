import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LanguageSpokenService } from 'src/app/services/language-spoken.service';

@Component({
  selector: 'app-add-language-spoken',
  templateUrl: './add-language-spoken.component.html',
  styleUrls: ['./add-language-spoken.component.scss'],
})
export class AddLanguageSpokenComponent implements OnInit {
  @Input('candidateId') candidateId!: string;
  @Output() closeIsAddLanguageSpoken = new EventEmitter();

  laguageSpokenForm!: FormGroup;
  responseMessage: any;

  constructor(
    private _formBuilder: FormBuilder,
    private _languageSpokenSvc: LanguageSpokenService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.buildLanguageSpokenForm();
  }

  /* LANGUAGE SPOKEN */
  buildLanguageSpokenForm() {
    this.laguageSpokenForm = this._formBuilder.group({
      Language: '',
      Proficiency: '',
    });
  }
  saveLanguageSpoken() {
    // 
    this._languageSpokenSvc
      .addLanguageSpoken(this.candidateId, this.laguageSpokenForm.value)
      .subscribe((response: any) => {
        if (response) {
          
          this.responseMessage = response.Msg;
          setTimeout(() => {
            this.laguageSpokenForm.reset();
            this.onCloseForm();
          }, 2500);
        }
      });

    // console.log(this.laguageSpokenForm.value);
    // let userData = this._userSvc.getUserData();
    // this._languageSpokenSvc.addLanguageSpoken(userData.Id, this.laguageSpokenForm.value).subscribe((response:any)=>{
    //   if(response){
    //     this.responseMessage = response.Msg;
    //     setTimeout(() => {
    //       this._languageSpokenSvc.sendAddBehaviouralMsg(false);
    //     }, 2000);
    //   }
    // })
  }
  onCloseForm() {
    
    this.closeIsAddLanguageSpoken.emit(false);
    // this.dialogRef.close('close');
  }
}
