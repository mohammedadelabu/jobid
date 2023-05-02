import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { EducationService } from 'src/app/services/education.service';
import { UpdateEducationComponent } from '../update-education/update-education.component';

@Component({
  selector: 'app-preview-education',
  templateUrl: './preview-education.component.html',
  styleUrls: ['./preview-education.component.scss'],
})
export class PreviewEducationComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Input('candidateId') candidateId!: string;
  educationList: any;
  Subscriptions: Subscription[] = [];
  constructor(
    private _educationSvc: EducationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getWorkHistory(this.candidateId);
  }

  ngAfterViewInit() {
    
  }

  getWorkHistory(id: any) {
    let subscription = this._educationSvc.getCandidateEducation(id).subscribe({
      next: (response: any) => {
        if (response.ResponseCode == '00') {
          this.educationList = response.Data;
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.Subscriptions.push(subscription);
  }

  updateEducation(educationId: string, candidateId: string) {const dialogRef = this.dialog.open(UpdateEducationComponent, {
      width: '100%',
      maxHeight: '95vh',
      data: { educationId: educationId, candidateId: candidateId },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {
      // 
      if (result) {
        this.getWorkHistory(this.candidateId);
      }
    });
    this.Subscriptions.push(subscription);
  }

  removeEducation(educationId: any) {
    let confirmDelete = confirm(
      'Are you sure you want to delete this work education?'
    );
    if (confirmDelete) {
      let subscription = this._educationSvc
        .removeEducation(educationId)
        .subscribe({
          next: (response: any) => {
            // console.log('deleted: ', response);
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
