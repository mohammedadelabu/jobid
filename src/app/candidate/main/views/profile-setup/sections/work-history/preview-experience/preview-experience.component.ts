import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ExperienceService } from 'src/app/services/experience.service';
import { UpdateExperienceComponent } from '../update-experience/update-experience.component';

@Component({
  selector: 'app-preview-experience',
  templateUrl: './preview-experience.component.html',
  styleUrls: ['./preview-experience.component.scss'],
})
export class PreviewExperienceComponent implements OnInit, OnDestroy {
  @Input('candidateId') candidateId!: string;
  workHistoryList: any;
  Subscriptions: Subscription[] = [];
  constructor(
    private _experienceSvc: ExperienceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getWorkHistory(this.candidateId);
  }

  getWorkHistory(id: any) {
    let subscription = this._experienceSvc
      .getCandidateWorkHistory(id)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.workHistoryList = response.Data;
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.Subscriptions.push(subscription);
  }

  updateExperience(experienceId: string, candidateId: string) {    
    const dialogRef = this.dialog.open(UpdateExperienceComponent, {
      width: '100%',
      maxHeight: '95vh',
      data: { experienceId: experienceId, candidateId: candidateId },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {
      
      if (result) {
        this.getWorkHistory(this.candidateId);
      }
    });
    this.Subscriptions.push(subscription);
  }

  removeExperience(experienceId: any) {
    // console.log(experienceId);

    let confirmDelete = confirm(
      'Are you sure you want to delete this work experience?'
    );
    if (confirmDelete) {
      let subscription = this._experienceSvc
        .removeWorkExperience(experienceId)
        .subscribe({
          next: (response: any) => {
            if (response) {
              this.getWorkHistory(this.candidateId);
            }
          },
          error: (err: any) => {
            console.warn('Error: ', err);
          },
        });
      this.Subscriptions.push(subscription);
    }
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
