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
import { UpdateProject } from 'src/app/models/project-management';
import { CompanyService } from 'src/app/services/company.service';
import { ProjectManagementService } from 'src/app/services/project-management.service';
import { IdentityService } from 'src/app/services/identity.service';
import { Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { select } from '@angular-redux/store';

@Component({
  selector: 'app-edit-project-form',
  templateUrl: './edit-project-form.component.html',
  styleUrls: ['./edit-project-form.component.scss'],
})
export class EditProjectFormComponent implements OnInit {
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

  EditProjectForm!: FormGroup;
  companyList: any = [];
  isSelected: boolean = false;
  loggedInUser: any;
  newCompanyId: any;
  isphoneNumberError = false;
  selectedValue: any = 'option2';

  @ViewChild('assigneeInput')
  assigneeInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<EditProjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    public dialog: MatDialog,
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

  closeEditDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.onGetCompanyList();
    this.buildForm();
    this.updatedBy();
    this.selectedValue = this.editData.projectData.CompanyId;
  }

  buildForm() {
    this.EditProjectForm = this._fb.group({
      ProjectName: this.editData.projectData.ProjectName,
      CompanyId: this.editData.projectData.CompanyId,
      Hours: this.editData.projectData.Hours,
      TriggerName: this.editData.projectData.TriggerName,
      TimeTrigger: this.editData.projectData.TimeTrigger,
      UpdatedBy: this.loggedInUser,
    });
    return this.EditProjectForm;
  }

  updatedBy() {
    this.loggedInUser = this._identitySvc.getLoggedInUserData().Id;
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
    const data: UpdateProject = {
      ProjectName: this.EditProjectForm.value.ProjectName,
      CompanyId: this.EditProjectForm.value.CompanyId,
      Hours: this.EditProjectForm.value.Hours,
      TriggerName: this.EditProjectForm.value.TriggerName,
      TimeTrigger: this.EditProjectForm.value.TimeTrigger,
      UpdatedBy: this.loggedInUser,
    };

    this._projectMgmService
      .updateProjectMgmtProject(data, this.editData.projectData.ProjectId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.closeEditDialog();
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
