import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/types/project';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { MessengerService } from 'src/app/services/messenger.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss'],
})
export class UpdateProjectComponent implements OnInit, OnDestroy {
  updateProjectForm!: FormGroup;
  responseMsg!: string;
  ProjectId!: any;
  candidateId: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _projectSvc: ProjectService,
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _editedCandidateCvSvc: EditCandidateCvService,
    private _messengerSvc: MessengerService
  ) {}

  ngOnInit(): void {
    this.onGetCandidateId();
    this.buildForm();
    this.getProjectParamId();
    this.getCandidateProjects();
  }
  onGetCandidateId() {
    this.candidateId = this._editedCandidateCvSvc.getCandidateToEditCvId();
    
  }

  buildForm() {
    this.updateProjectForm = this._formBuilder.group({
      ProjectName: '',
      ProjectUrl: '',
      StartDate: '2022-01',
      StopDate: '2022-12',
    });
  }

  getProjectParamId() {
    let subscription = this._route.paramMap.subscribe({
      next: (params) => {
        console.log(params);
        this.ProjectId = params.get('id');
        console.log('Selected education ID: ', this.ProjectId);
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
    this.subscriptions.push(subscription);
  }

  getCandidateProjects() {
    // this._editedCandidateSvc.getEditedCandidateIdMsg().subscribe((response) => {
    //   console.log('candidate: ', response);
    //   if (response == null) {
    //     this._router.navigate(['/administrator/candidates/']);
    //   } else {
    //     this.candidateId = response;
    //     console.log('candidate id to be edited: ', this.candidateId);
    //     this._projectSvc
    //       .getCandidateProjects(this.candidateId)
    //       .subscribe((response: any) => {
    //         let projectsList = response.Data;
    //         console.log('list: ', projectsList);
    //         let item = projectsList.filter((x: any) => {
    //           
    //           return this.ProjectId === x.Id;
    //         });
    //         
    //         this.prefillCandidateData(item[0]);
    //       });
    //   }
    // });

    let subscription = this._projectSvc
      .getCandidateProjects(this.candidateId)
      .subscribe((response: any) => {
        let projectsList = response;
        console.log('list: ', projectsList);
        let item = projectsList.filter((x: any) => {
          
          return this.ProjectId === x.Id;
        });
        
        this.prefillCandidateData(item[0]);
      });
    this.subscriptions.push(subscription);
  }

  prefillCandidateData(Data: any) {
    // this.workHistoryId = item[0].id;
    console.log('Data: ', Data);
    let StartDate = this._messengerSvc.formatConvertion(Data?.StartDate);
    let StopDate = this._messengerSvc.formatConvertion(Data?.StopDate);

    this.updateProjectForm.controls['ProjectName'].setValue(Data.ProjectName);
    this.updateProjectForm.controls['ProjectUrl'].setValue(Data.ProjectUrl);
    this.updateProjectForm.controls['StartDate'].setValue(StartDate);
    this.updateProjectForm.controls['StopDate'].setValue(StopDate);
  }

  updateProject() {
    console.log(this.updateProjectForm.value);
    console.log(this.ProjectId);

    const newData: Project = {
      ProjectName: this.updateProjectForm.value.ProjectName,
      ProjectUrl: this.updateProjectForm.value.ProjectUrl,
      StartDate: this._messengerSvc.reformatDate(
        this.updateProjectForm.value.StartDate
      ),
      StopDate: this._messengerSvc.reformatDate(
        this.updateProjectForm.value.StopDate
      ),
      UpdatedBy: '',
    };
    
    let subscription = this._projectSvc
      .updateProject(newData, this.ProjectId)
      .subscribe((response: any) => {
        if (response) {
          
          this.responseMsg = response.ResponseMessage;
          setTimeout(() => {
            this._router.navigate(['/edit-candidate-cv/projects']);
          }, 2000);
        }
      });
    this.subscriptions.push(subscription);

    // this._http
    //   .put(
    //     `http://localhost:3000/Project/${this.ProjectId}`,
    //     this.updateProjectForm.value
    //   )
    //   .subscribe((response: any) => {
    //     if(response){
    //       this.responseMsg = "Project updated!"
    //       setTimeout(() => {
    //         console.log("Project updated!",response);
    //         this.isEdit = false;
    //         this.getDemoData();
    //       }, 2000);
    //     }
    //   });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
