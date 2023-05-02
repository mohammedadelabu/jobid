import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectFormComponent } from './create-project-form/create-project-form.component';
import { EditProjectFormComponent } from './edit-project-form/edit-project-form.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectManagementService } from 'src/app/services/project-management.service';
import { IdentityService } from 'src/app/services/identity.service';
import { UpdateProject } from 'src/app/models/project-management';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  editData: any = {
    ProjectName: 'string',
    CompanyId: 'string',
    Hours: 'string',
    TriggerName: 'string',
    TimeTrigger: 'string',
    UpdatedBy: 'string',
  };

  EditProjectForm!: FormGroup;

  loginUserForm!: FormGroup;
  errorMsg: any;
  loggedInUser: any;
  projectList: any = [];
  constructor(
    public dialog: MatDialog,
    private _fb: FormBuilder,
    private _identitySvc: IdentityService,
    private projMgmService: ProjectManagementService
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(CreateProjectFormComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.getAllProjects();
    });
  }

  openEditDialog(project: any) {
    const dialogRef = this.dialog.open(EditProjectFormComponent, {
      data: {
        projectData: project,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // fetch updated projects on dialog close
      this.getAllProjects();
    });
  }

  ngOnInit(): void {
    this.getLoggedInUser();

    this.getAllProjects();
  }

  buildForm() {
    this.EditProjectForm = this._fb.group({
      ProjectName: '',
      CompanyId: '',
      Hours: '',
      TriggerName: '',
      TimeTrigger: '',
      UpdatedBy: '',
    });
    return this.EditProjectForm;
  }

  getAllProjects() {
    this.projMgmService.getProjectMgmtProjects().subscribe({
      next: (response: any) => {
        if (response) {
          console.log('response', response.Data);
          this.projectList = response.Data;
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
  }

  deleteProject(id: any) {
    if (window.confirm('Are you sure?')) {
      this.projMgmService.removeProjectMgmtProject(id).subscribe({
        next: (response: any) => {
          if (response) {
            this.getAllProjects();
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    }
  }

  // projectHoursDetails: any;

  // getHoursDetails(data: any) {
  //   console.log('hours output data', data);
  //   this.projectHoursDetails.emit(data);
  // }

  getLoggedInUser() {
    this.loggedInUser = this._identitySvc.getLoggedInUserData();
  }
}
