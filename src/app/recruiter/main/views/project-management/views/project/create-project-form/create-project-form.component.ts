import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AddProject } from 'src/app/models/project-management';
import { CompanyService } from 'src/app/services/company.service';
import { ProjectManagementService } from 'src/app/services/project-management.service';
import { IdentityService } from 'src/app/services/identity.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrls: ['./create-project-form.component.css'],
})
export class CreateProjectFormComponent implements OnInit {
  @select((s) => s.companyList.companyList) companyList$: any;
  @select((s) => s.companyList.isLoading) isLoading$: any;
  title: any = 'Angular2 Multiselect Dropdown';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  assigneeControl = new FormControl('');
  filteredAssignees: any = [];
  assignees: string[] = [];
  allAssignees: string[] = ['Mark', 'John', 'Luke', 'Stephen', 'Paul'];
  selectedItems: any = [];
  dropdownSettings: any;

  AddProjectForm!: FormGroup;
  companyList: any = [];
  isSelected: boolean = false;
  loggedInUser: any;
  newCompanyId: any;
  isphoneNumberError = false;

  @ViewChild('assigneeInput')
  assigneeInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<CreateProjectFormComponent>,

    private _fb: FormBuilder,
    private _companySvc: CompanyService,
    private _router: Router,
    private _identitySvc: IdentityService,
    private _projectMgmService: ProjectManagementService
  ) {
    this.filteredAssignees = this.assigneeControl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) =>
        fruit ? this._filter(fruit) : this.allAssignees.slice()
      )
    );
  }

  closeCreateDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.onGetCompanyList();
    this.buildForm();
    this.updatedBy();
  }

  buildForm() {
    this.AddProjectForm = this._fb.group({
      ProjectName: '',
      CompanyId: '',
      Hours: '',
      TriggerName: '',
      TimeTrigger: '',
      UpdatedBy: '',
    });
    return this.AddProjectForm;
  }

  updatedBy() {
    this.loggedInUser = this._identitySvc.getLoggedInUserData().Id;
    console.log('log', this.loggedInUser);
  }

  onGetCompanyList() {
    this._companySvc.LoadCompanyList();
    this.companyList = this.companyList$.subscribe({
      next: (response: any) => {
        if (response) {
          this.companyList = response.Data;
          console.log('this.companyList', this.companyList);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
  }

  onSubmit() {
    const data: AddProject = {
      ProjectName: this.AddProjectForm.value.ProjectName,
      CompanyId: this.AddProjectForm.value.CompanyId,
      Hours: this.AddProjectForm.value.Hours,
      TriggerName: this.AddProjectForm.value.TriggerName,
      TimeTrigger: this.AddProjectForm.value.TimeTrigger,
      UpdatedBy: this.loggedInUser,
    };

    console.log('data', data);

    /*

    CompanyId: "57f54743-6109-45de-495d-08da331b0525"
Hours: 22
ProjectName: "sdsfas"
TimeTrigger: "14:18"
TriggerName: "adasd"
UpdatedBy: "c6ee53c9-2450-4ffc-bc83-6f8243c89a25"

    */
    this._projectMgmService
      .createProjectMgmtProject(data, this.loggedInUser)
      .subscribe({
        next: (response: any) => {
          if (response) {
            console.log('Created Project Response: ', response);
            this.AddProjectForm.reset();
            this.closeCreateDialog();
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.assignees.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.assigneeControl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.assignees.indexOf(fruit);

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

    return this.allAssignees.filter((fruit) =>
      fruit.toLowerCase().includes(filterValue)
    );
  }
}
