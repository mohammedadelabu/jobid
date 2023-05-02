import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/models/types/project';
import { MessengerService } from 'src/app/services/messenger.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss'],
})
export class AddProjectComponent implements OnInit, OnDestroy {
  @Input('candidateId') candidateId!: string;
  @Output() closeIsAddProject = new EventEmitter();

  projectsForm!: FormGroup;
  responseMsg: any;
  Subscriptions: Subscription[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _projectSvc: ProjectService,
    private _router: Router,
    private _messengerSvc: MessengerService
  ) {}

  ngOnInit(): void {
    this.buildProjectsForm();
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
            setTimeout(() => {
              this.projectsForm.reset();
              this.onCloseForm();
            }, 2500);
          }
        });
      this.Subscriptions.push(subscription);
    }
  }
  onCloseForm() {
    this.closeIsAddProject.emit(false);
    
  }
  goBack() {
    history.back();
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
