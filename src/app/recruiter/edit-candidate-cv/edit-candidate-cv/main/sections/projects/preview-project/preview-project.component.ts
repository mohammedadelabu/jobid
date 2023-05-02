import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-preview-project',
  templateUrl: './preview-project.component.html',
  styleUrls: ['./preview-project.component.scss'],
})
export class PreviewProjectComponent implements OnInit, OnDestroy {
  infoMessage = 'No project provided yet!';
  list = [
    {
      Id: 1,
    },
  ];
  candidateProjectList: any;
  candidateId: any;
  subscriptions: Subscription[] = [];

  constructor(
    private _projectSvc: ProjectService,
    private _editCandidateCvSvc: EditCandidateCvService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // this.getCandidateProject();
    this.onGetCandidateId();
    this.getData();
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    
  }

  getData() {
    let subscription = this._projectSvc
      .getCandidateProjects(this.candidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.candidateProjectList = response;
          }
        },
        error: (err) => {
          console.warn('Error msg: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  removeProject(ProjectId: any) {
    console.log(ProjectId);
    let confirmDelete = confirm(
      'Are you sure you want to delete this Project?'
    );
    if (confirmDelete) {
      let subscription = this._projectSvc.removeProject(ProjectId).subscribe({
        next: (response: any) => {
          
          this.getData();
        },
        error: (err) => {
          console.warn('Error msg: ', err);
        },
      });
      this.subscriptions.push(subscription);
    }
  }

  onGoBack() {
    history.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
