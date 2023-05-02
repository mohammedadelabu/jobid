import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ProjectService } from 'src/app/services/project.service';
import { UpdateProjectComponent } from '../update-project/update-project.component';

@Component({
  selector: 'app-preview-projects',
  templateUrl: './preview-projects.component.html',
  styleUrls: ['./preview-projects.component.scss'],
})
export class PreviewProjectsComponent implements OnInit, OnDestroy {
  @Input('candidateId') candidateId!: string;
  projectList: any;
  candidateProjectList: any;
  Subscriptions: Subscription[] = [];

  constructor(private _projectSvc: ProjectService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getProjectList(this.candidateId);
  }

  getProjectList(CandidateId: string) {
    let subscription = this._projectSvc
      .getCandidateProjects(CandidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            
            this.candidateProjectList = response.Data;
          }
        },
        error: (err) => {
          console.warn('Error msg: ', err);
        },
      });
    this.Subscriptions.push(subscription);
  }
  updateExperience(projectId: string, candidateId: string) {
    
    const dialogRef = this.dialog.open(UpdateProjectComponent, {
      width: '100%',
      maxHeight: '95vh',
      data: { projectId: projectId, candidateId: candidateId },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {
      
      if (result) {
        this.getProjectList(this.candidateId);
      }
    });
    this.Subscriptions.push(subscription);
  }

  removeExperience(projectId: any) {
    // console.log(projectId);

    let confirmDelete = confirm(
      'Are you sure you want to delete this work experience?'
    );
    if (confirmDelete) {
      let subscription = this._projectSvc.removeProject(projectId).subscribe({
        next: (response: any) => {
          if (response) {
            this.getProjectList(this.candidateId);
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
