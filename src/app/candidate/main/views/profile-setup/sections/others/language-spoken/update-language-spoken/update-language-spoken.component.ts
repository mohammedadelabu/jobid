import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LanguageSpokenService } from 'src/app/services/language-spoken.service';

@Component({
  selector: 'app-update-language-spoken',
  templateUrl: './update-language-spoken.component.html',
  styleUrls: ['./update-language-spoken.component.scss'],
})
export class UpdateLanguageSpokenComponent implements OnInit {
  @Output() closeIsUpdateLanguageSpoken = new EventEmitter();

  updateLanguageSpokenForm!: FormGroup;
  LanguageSpokenId: any;
  responseMessage!: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateLanguageSpokenComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { languageSpoken: any },
    private _formBuilder: FormBuilder,
    private _languageSpokenSvc: LanguageSpokenService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.handleIsEdit(this.data.languageSpoken);
  }

  buildForm() {
    this.updateLanguageSpokenForm = this._formBuilder.group({
      Language: '',
      Proficiency: '',
    });
  }

  handleIsEdit(Language: any) {
    // console.log('edit Project id', Language);
    this.LanguageSpokenId = Language.Id;
    this.updateLanguageSpokenForm.controls['Language'].setValue(
      Language.Language
    );
    this.updateLanguageSpokenForm.controls['Proficiency'].setValue(
      Language.Proficiency
    );
  }

  updateLanguageSpoken() {
    // console.log(this.updateLanguageSpokenForm.value);
    this._languageSpokenSvc
      .updateLanguageSpoken(
        this.LanguageSpokenId,
        this.updateLanguageSpokenForm.value
      )
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.responseMessage = 'Language spoken updated!';
            setTimeout(() => {
              // console.log('Language spoken updated!', response);
              this.updateLanguageSpokenForm.reset();
              this.onCloseForm();
            }, 2000);
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
  }
  onCloseForm() {
    this.closeIsUpdateLanguageSpoken.emit(false);
    this.dialogRef.close('close');

  }
}
