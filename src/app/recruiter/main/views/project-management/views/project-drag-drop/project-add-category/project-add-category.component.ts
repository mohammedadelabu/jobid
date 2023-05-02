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
  selector: 'app-project-add-category',
  templateUrl: './project-add-category.component.html',
  styleUrls: ['./project-add-category.component.scss'],
})
export class ProjectAddCategoryComponent implements OnInit {
  title: any = 'Angular2 Multiselect Dropdown';
  separatorKeysCodes: number[] = [ENTER, COMMA];
  assigneeControl = new FormControl('');
  filteredAssignees: any = [];
  assignees: string[] = [];
  allAssignees: string[] = ['Mark', 'John', 'Luke', 'Stephen', 'Paul'];
  selectedItems: any = [];
  dropdownSettings: any;

  AddSectionForm!: FormGroup;
  companyList: any = [];
  isSelected: boolean = false;
  loggedInUser: any;
  projectId: any;
  @ViewChild('assigneeInput')
  assigneeInput!: ElementRef<HTMLInputElement>;

  constructor(
    public dialogRef: MatDialogRef<ProjectAddCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public addData: any,
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
    console.log(' this.addData', this.addData);
    this.buildForm();
    this.CreatedBy();
  }

  buildForm() {
    this.AddSectionForm = this._fb.group({
      SectionName: '',
      SectionDescription: '',
    });
    return this.AddSectionForm;
  }

  CreatedBy() {
    this.loggedInUser = this._identitySvc.getLoggedInUserData().Id;
  }

  closeEditDialog() {
    this.dialogRef.close();
  }

  onSubmit() {
    const data: any = {
      Name: this.AddSectionForm.value.SectionName,
      Description: this.AddSectionForm.value.SectionDescription,
      // Step: this.addData.Data.Step,
      ProjectId: this.addData.ProjectId,
    };

    this.projectMgmCategoryService.createProjectMgmtCategory(data).subscribe({
      next: (response: any) => {
        console.log('result', response);
        if (response) {
          this.closeEditDialog();
        }
      },
      error: (err: any) => {
        
      },
    });
  }
}
