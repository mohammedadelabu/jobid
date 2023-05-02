import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Inject,
} from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddProject } from 'src/app/models/project-management';
import { CompanyService } from 'src/app/services/company.service';
import { ProjectManagementTaskService } from 'src/app/services/project-management-task.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-edit-task',
  templateUrl: './project-edit-task.component.html',
  styleUrls: ['./project-edit-task.component.scss'],
})
export class ProjectEditTaskComponent implements OnInit {
  title: any = 'Angular2 Multiselect Dropdown';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  assigneeControl = new FormControl('');
  filteredAssignees: any = [];
  assignees: string[] = [];
  allAssignees: string[] = ['Mark', 'John', 'Luke', 'Stephen', 'Paul'];
  selectedItems: any = [];
  dropdownSettings: any;

  EditTaskForm!: FormGroup;
  companyList: any = [];
  isSelected: boolean = false;
  loggedInUser: any;
  projectId: any;
  @ViewChild('assigneeInput')
  assigneeInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<ProjectEditTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private _fb: FormBuilder,
    private _companySvc: CompanyService,
    private _router: Router,
    private activatedRoute: ActivatedRoute,

    private _identitySvc: IdentityService,
    private _projectMgmTaskService: ProjectManagementTaskService
  ) {
    this.filteredAssignees = this.assigneeControl.valueChanges.pipe(
      startWith(null),
      map((assignee: string | null) =>
        assignee ? this._filter(assignee) : this.allAssignees.slice()
      )
    );

    this.activatedRoute.queryParams.subscribe(
      (params) => (this.projectId = window.location.pathname.split('/')[4])
    );
  }

  ngOnInit(): void {
    this.buildForm();
    this.CreatedBy();
  }

  buildForm() {
    this.EditTaskForm = this._fb.group({
      TaskName: this.editData.taskData.TaskName,
      Description: this.editData.taskData.Description,
      CreatedBy: this.editData.taskData.CreatedBy,
      DueDate: this.editData.taskData.DueDate,
      StartTime: this.editData.taskData.StartTime,
      EndTime: this.editData.taskData.EndTime,
    });
    return this.EditTaskForm;
  }

  CreatedBy() {
    this.loggedInUser = this._identitySvc.getLoggedInUserData().Id;
  }

  closeEditDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    const data: any = {
      TaskName: this.EditTaskForm.value.TaskName,
      Description: this.EditTaskForm.value.Description,
      CreatedBy: this.loggedInUser,
      DueDate: this.EditTaskForm.value.DueDate,
      StartTime: this.EditTaskForm.value.StartTime,
      EndTime: this.EditTaskForm.value.EndTime,
    };

    this._projectMgmTaskService
      .updateProjectMgmtProjectTask(data, this.editData.taskData.Id)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.closeEditDialog();
          }
        },
        error: (err: any) => {
          
        },
      });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our assignee
    if (value) {
      this.assignees.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.assigneeControl.setValue(null);
  }

  remove(assignee: string): void {
    const index = this.assignees.indexOf(assignee);

    if (index >= 0) {
      this.assignees.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.assignees.push(event.option.viewValue);
    this.assigneeInput.nativeElement.value = '';
    this.assigneeControl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allAssignees.filter((assignee) =>
      assignee.toLowerCase().includes(filterValue)
    );
  }
}
