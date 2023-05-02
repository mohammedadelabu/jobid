import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/types/project';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit, OnDestroy {
  projectsForm!: FormGroup;
  responseMsg: any;
  candidateId: any;
  subscriptions: Subscription[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _projectSvc: ProjectService,
    private _router: Router,
    private _editedCandidateCvSvc: EditCandidateCvService,
    private _messengerSvc: MessengerService
  ) {}

  ngOnInit(): void {
    this.onGetCandidateId();
    this.buildProjectsForm();
  }

  onGetCandidateId() {
    this.candidateId = this._editedCandidateCvSvc.getCandidateToEditCvId();
    
  }

  /* PROJECTS */
  buildProjectsForm() {
    this.projectsForm = this._formBuilder.group({
      ProjectName: '',
      ProjectUrl: '',
      StartDate: '2022-01',
      StopDate: '2022-12',
    });
  }

  saveProjects() {
    const formData: Project = {
      ProjectName: this.projectsForm.value.ProjectName,
      ProjectUrl: this.projectsForm.value.ProjectUrl,
      StartDate: this._messengerSvc.reformatDate(
        this.projectsForm.value.StartDate
      ),
      StopDate: this._messengerSvc.reformatDate(
        this.projectsForm.value.StopDate
      ),
      UpdatedBy: '',
    };

   
    if (formData.StartDate && formData.StopDate) {
      let subscription = this._projectSvc
        .addProject(formData, this.candidateId)
        .subscribe((response: any) => {
          if (response) {
            
            this.responseMsg = response.Msg;
            console.log('Project added!', response);
            setTimeout(() => {
              this.projectsForm.reset();
              this._router.navigate(['/edit-candidate-cv/projects']);
            }, 2500);
          }
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
