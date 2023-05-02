import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
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
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ProjectManagementCategoryService } from 'src/app/services/project-management-category.service';

@Component({
  selector: 'app-project-create-task',
  templateUrl: './project-create-task.component.html',
  styleUrls: ['./project-create-task.component.scss'],
})
export class ProjectCreateTaskComponent implements OnInit {
  title: any = 'Angular2 Multiselect Dropdown';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  assigneeControl = new FormControl('');
  filteredAssignees: any = [];
  assignees: string[] = [];
  allAssignees: string[] = ['Mark', 'John', 'Luke', 'Stephen', 'Paul'];
  selectedItems: any = [];
  dropdownSettings: any;
  categories: any = [];
  AddTaskForm!: FormGroup;
  companyList: any = [];
  isSelected: boolean = false;
  loggedInUser: any;
  projectId: any;
  @ViewChild('assigneeInput')
  assigneeInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<ProjectCreateTaskComponent>,
    private projectMgmCategoryService: ProjectManagementCategoryService,

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
  closeCreateDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.buildForm();
    this.CreatedBy();
    this.getAllCategories();
    console.log('this.projectId', this.projectId);
  }

  buildForm() {
    this.AddTaskForm = this._fb.group({
      TaskName: '',
      Description: '',
      CreatedBy: '',
      DueDate: '',
      StartTime: '',
      EndTime: '',
    });
    return this.AddTaskForm;
  }

  CreatedBy() {
    this.loggedInUser = this._identitySvc.getLoggedInUserData().Id;
  }

  getAllCategories() {
    this.projectMgmCategoryService
      .getProjectMgmtCategories(this.projectId)
      .subscribe({
        next: (response: any) => {
          this.categories = response.Data;
        },
        error: (err: any) => {},
      });
  }

  onSubmit() {
    const data: any = {
      TaskName: this.AddTaskForm.value.TaskName,
      Description: this.AddTaskForm.value.Description,
      CreatedBy: this.loggedInUser,
      DueDate: this.AddTaskForm.value.DueDate,
      StartTime: this.AddTaskForm.value.StartTime,
      EndTime: this.AddTaskForm.value.EndTime,
      CategoryId: this.categories[0].Id,
    };

    console.log('formdata', data);

    this._projectMgmTaskService
      .createProjectMgmtTask(data, this.projectId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            console.log('Created Project Response: ', response);
            this.closeCreateDialog();
            // this.AddTaskForm.reset();
            // this._router.navigate(['/recruiter/project-management/project']);
            // window.location.reload();
            // this._router.navigate(['/recruiter/crm/companies/add-contact']);
          }
        },
        error: (err: any) => {},
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
