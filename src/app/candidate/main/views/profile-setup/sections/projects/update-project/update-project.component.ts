import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/types/project';
import { MessengerService } from 'src/app/services/messenger.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss'],
})
export class UpdateProjectComponent implements OnInit, OnDestroy {
  @Output() closeIsUpdateProject = new EventEmitter();
  candidateId!: string;
  Subscriptions: Subscription[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    public dialogRef: MatDialogRef<UpdateProjectComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { projectId: string; candidateId: string },
    private _projectSvc: ProjectService,
    private _messengerSvc: MessengerService
  ) {}

  updateProjectForm!: FormGroup;
  responseMsg!: string;
  projectId!: any;
  ngOnInit(): void {
    this.buildForm();
  }

  ngAfterViewInit() {
    this.projectId = this.data?.projectId;
    this.candidateId = this.data?.candidateId;
    // console.log((this.data?.candidateId, this.projectId));
    // console.log(
    //   'candidateId: ',
    //   this.candidateId,
    //   'projectId: ',
    //   this.projectId
    // );
    this.getCandidateProjects(this.candidateId, this.projectId);
  }

  buildForm() {
    this.updateProjectForm = this._formBuilder.group({
      ProjectName: '',
      ProjectUrl: '',
      StartDate: '2022-01',
      StopDate: '2022-12',
    });
  }

  getCandidateProjects(CandidateId: string, ProjectId: string) {
    let subscription = this._projectSvc
      .getCandidateProjects(CandidateId)
      .subscribe((response: any) => {
        let projectsList = response.Data;
        let item = projectsList.filter((x: any) => {

          return this.projectId === x.Id;
        });
        this.prefillCandidateData(item[0]);
      });
    this.Subscriptions.push(subscription);
  }

  prefillCandidateData(Data: any) {
    // this.workHistoryId = item[0].id;
    let StartDate = this._messengerSvc.formatConvertion(Data?.StartDate);
    let StopDate = this._messengerSvc.formatConvertion(Data?.StopDate);

    this.updateProjectForm.controls['ProjectName'].setValue(Data.ProjectName);
    this.updateProjectForm.controls['ProjectUrl'].setValue(Data.ProjectUrl);
    this.updateProjectForm.controls['StartDate'].setValue(StartDate);
    this.updateProjectForm.controls['StopDate'].setValue(StopDate);
  }

  updateProject() {
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
      .updateProject(newData, this.projectId)
      .subscribe((response: any) => {
        if (response) {

          this.responseMsg = response.ResponseMessage;
          setTimeout(() => {
            this.onCloseForm();
          }, 2000);
        }
      });
    this.Subscriptions.push(subscription);

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

  onCloseForm() {
    this.dialogRef.close('close');

    this.closeIsUpdateProject.emit(false);
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
