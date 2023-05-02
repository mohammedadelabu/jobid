import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IdentityService } from 'src/app/services/identity.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-update-recruition-status',
  templateUrl: './update-recruition-status.component.html',
  styleUrls: ['./update-recruition-status.component.scss'],
})
export class UpdateRecruitionStatusComponent implements OnInit {
  UpdateRecruisitionStatusForm!: FormGroup;

  RecruisitionStatus = [
    {
      name: 'Ongoing',
      value: 'ongoing',
    },
    {
      name: 'New',
      value: 'new',
    },
    {
      name: 'Rejected',
      value: 'rejected',
    },
    {
      name: 'On hold',
      value: 'onhold',
    },
    {
      name: 'Closed',
      value: 'closed',
    },
    {
      name: 'Rollover',
      value: 'rollover',
    },
    {
      name: 'Profile Submitted Awaiting feedback',
      value: 'awaiting-feedback',
    },
  ];
  Job: any;
  constructor(
    private _identitySvc: IdentityService,
    private _profileSvc: ProfileService,
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<UpdateRecruitionStatusComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Job: any }
  ) {}

  ngOnInit(): void {
    console.log('Job: ', this.data?.Job);
    this.Job = this.data?.Job;
    this.buildForm();
  }

  buildForm() {
    this.UpdateRecruisitionStatusForm = this._fb.group({
      Status: ['', Validators.required],
    });
  }

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    
    return updatedBy;
  }

  onSubmit() {
    const Payload = {
      Status: this.UpdateRecruisitionStatusForm.value.Status,
      Id: this.Job.Id,
      UpdatedBy: this.onGetUpdatedBy(),
    };
    
  }

  closeDialog() {
    this.dialogRef.close('closed!');
  }
}
