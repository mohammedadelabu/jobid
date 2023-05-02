import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Inject,
} from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from 'src/app/services/company.service';
import { ProjectManagementCategoryService } from 'src/app/services/project-management-category.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-project-edit-category',
  templateUrl: './project-edit-category.component.html',
  styleUrls: ['./project-edit-category.component.scss'],
})
export class ProjectEditCategoryComponent implements OnInit {
  title: any = 'Angular2 Multiselect Dropdown';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  assigneeControl = new FormControl('');
  filteredAssignees: any = [];
  assignees: string[] = [];
  allAssignees: string[] = ['Mark', 'John', 'Luke', 'Stephen', 'Paul'];
  selectedItems: any = [];
  dropdownSettings: any;

  EditSectionForm!: FormGroup;
  companyList: any = [];
  isSelected: boolean = false;
  loggedInUser: any;
  projectId: any;
  @ViewChild('assigneeInput')
  assigneeInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<ProjectEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private _fb: FormBuilder,
    private activatedRoute: ActivatedRoute,

    private _identitySvc: IdentityService,
    private projectMgmCategoryService: ProjectManagementCategoryService
  ) {
    this.activatedRoute.queryParams.subscribe(
      (params) => (this.projectId = window.location.pathname.split('/')[4])
    );
  }

  ngOnInit(): void {
    console.log('edit data', this.editData);
    this.buildForm();
    this.CreatedBy();
  }

  buildForm() {
    this.EditSectionForm = this._fb.group({
      SectionName: this.editData.Data.Name,
      SectionDescription: this.editData.Data.Description,
    });
    return this.EditSectionForm;
  }

  CreatedBy() {
    this.loggedInUser = this._identitySvc.getLoggedInUserData().Id;
  }

  closeEditDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    const data: any = {
      Name: this.EditSectionForm.value.SectionName,
      Description: this.EditSectionForm.value.SectionDescription,
      // Step: this.editData.Data.Step,
      ProjectId: this.editData.Data.ProjectId,
    };

    this.projectMgmCategoryService
      .updateProjectMgmtProjectCategory(data, this.editData.Data.Id)
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
}
