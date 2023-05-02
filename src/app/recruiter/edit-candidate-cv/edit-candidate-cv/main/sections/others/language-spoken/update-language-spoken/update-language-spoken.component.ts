import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LanguageSpokenService } from 'src/app/services/language-spoken.service';

@Component({
  selector: 'app-update-language-spoken',
  templateUrl: './update-language-spoken.component.html',
  styleUrls: ['./update-language-spoken.component.scss'],
})
export class UpdateLanguageSpokenComponent implements OnInit, OnDestroy {
  updateLanguageSpokenForm!: FormGroup;
  LanguageSpokenId: any;
  responseMessage!: string;
  subscriptions: Subscription[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _languageSpokenSvc: LanguageSpokenService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    let subscription = this._languageSpokenSvc
      .getLanguageSubjectItem()
      .subscribe((response: any) => {
        this.handleIsEdit(response);
      });
    this.subscriptions.push(subscription);
  }

  buildForm() {
    this.updateLanguageSpokenForm = this._formBuilder.group({
      Language: '',
      Proficiency: '',
    });
  }

  handleIsEdit(Language: any) {
    this.LanguageSpokenId = Language.Id;
    this.updateLanguageSpokenForm.controls['Language'].setValue(
      Language.Language
    );
    this.updateLanguageSpokenForm.controls['Proficiency'].setValue(
      Language.Proficiency
    );
  }

  cancelEdit() {
    this._languageSpokenSvc.sendEditBehaviouralMsg(false);
  }

  updateLanguageSpoken() {
    let subscription = this._languageSpokenSvc
      .updateLanguageSpoken(
        this.LanguageSpokenId,
        this.updateLanguageSpokenForm.value
      )
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.responseMessage = 'Language spoken updated!';
            setTimeout(() => {
              this._languageSpokenSvc.sendEditBehaviouralMsg(false);
            }, 2000);
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
