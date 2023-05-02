import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LanguageSpokenService } from 'src/app/services/language-spoken.service';
import { UpdateLanguageSpokenComponent } from '../update-language-spoken/update-language-spoken.component';

@Component({
  selector: 'app-preview-language-spoken',
  templateUrl: './preview-language-spoken.component.html',
  styleUrls: ['./preview-language-spoken.component.scss'],
})
export class PreviewLanguageSpokenComponent implements OnInit {
  @Input('candidateId') candidateId!: string;

  languageList!: any;
  infoMessage = 'No language provided yet!';

  constructor(
    private _languageSpokenSvc: LanguageSpokenService,
    public dialog: MatDialog // private _userSvc: UserService
  ) {}

  ngOnInit(): void {
    this.getCandidateLanguages(this.candidateId);
  }

  getCandidateLanguages(CandidateId: string) {
    this._languageSpokenSvc.getLanguagesSpoken(CandidateId).subscribe({
      next: (response: any) => {
        if (response) {
          // 
          this.languageList = response.Data;
        }
      },
      error: (err: any) => {
        
      },
    });
  }

  isEditForm(LanguageSpoken: any) {
    const dialogRef = this.dialog.open(UpdateLanguageSpokenComponent, {
      width: '100%',
      maxHeight: '95vh',
      data: { languageSpoken: LanguageSpoken },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // 
      if (result) {
        this.getCandidateLanguages(this.candidateId);
      }
    });
  }

  onDelete(language: any) {
    // console.log('delete Language id', language);
    let confirmation = confirm(
      'Are you sure you want to delete this Language?'
    );
    if (confirmation) {
      this._languageSpokenSvc.deleteLanguageSpoken(language.Id).subscribe({
        next: (response: any) => {
          if (response) {
            // console.log('demo data delete project: ', response);
            this.getCandidateLanguages(this.candidateId);
          }
        },
        error: (err: any) => {
          
        },
      });
    }
  }
}
