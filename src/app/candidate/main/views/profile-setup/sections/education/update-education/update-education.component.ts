import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/types/country';
import { CountryListService } from 'src/app/services/country-list.service';
import { EducationService } from 'src/app/services/education.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger.service';

@Component({
  selector: 'app-update-education',
  templateUrl: './update-education.component.html',
  styleUrls: ['./update-education.component.scss'],
})
export class UpdateEducationComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @Output() closeIsUpdateEducation = new EventEmitter();
  countryList!: Country[];
  updateEducationForm!: FormGroup;
  responseMsg: any;
  educationId!: string;
  candidateId!: string;
  Subscriptions: Subscription[] = [];
  constructor(
    private _identitySvc: IdentityService,
    private _countryListSvc: CountryListService,
    private _formBuilder: FormBuilder,
    private _messengerSvc: MessengerService,
    private _educationSvc: EducationService,
    public dialogRef: MatDialogRef<UpdateEducationComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { educationId: string; candidateId: string }
  ) {}

  ngOnInit(): void {
    this.getCountryList();
    this.buildForm();
    this.onGetUpdatedBy();
  }

  ngAfterViewInit() {
    this.educationId = this.data?.educationId;
    this.candidateId = this.data?.candidateId;
    this.getCandidateEducation(this.candidateId, this.educationId);
  }
  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    
    return updatedBy;
  }

  getCountryList() {
    this.countryList = this._countryListSvc.getCountryList();
  }

  buildForm() {
    this.updateEducationForm = this._formBuilder.group({
      SchoolName: '',
      SchoolLocation: '',
      Degree: '',
      Field: '',
      StartDate: '2022-01',
      StopDate: '2022-12',
    });
  }

  getCandidateEducation(candidateId: string, educationId: string) {
    
    let subscription = this._educationSvc
      .getCandidateEducation(this.candidateId)
      .subscribe({
        next: (response: any) => {
          let educationList = response.Data;
          let item = educationList.filter((x: any) => {
            return educationId === x.Id;
          });
          this.prefillCandidateData(item[0]);
        },
        error: (err) => {
          console.warn(err);
        },
      });
    this.Subscriptions.push(subscription);
  }

  prefillCandidateData(Data: any) {
    let StartDate = this._messengerSvc.formatConvertion(Data?.StartDate);
    let StopDate = this._messengerSvc.formatConvertion(Data?.StopDate);
    // this.workHistoryId = item[0].id;
    this.updateEducationForm.controls['SchoolName'].setValue(Data.SchoolName);
    this.updateEducationForm.controls['SchoolLocation'].setValue(
      Data.SchoolLocation.toLowerCase()
    );
    this.updateEducationForm.controls['Degree'].setValue(Data.Degree);
    this.updateEducationForm.controls['Field'].setValue(Data.Field);
    this.updateEducationForm.controls['StartDate'].setValue(StartDate);
    this.updateEducationForm.controls['StopDate'].setValue(StopDate);
  }

  saveData() {
    const formData = {
      SchoolName: this.updateEducationForm.value.SchoolName,
      SchoolLocation: this.updateEducationForm.value.SchoolLocation,
      Degree: this.updateEducationForm.value.Degree,
      Field: this.updateEducationForm.value.Field,
      StartDate: this._messengerSvc.reformatDate(
        this.updateEducationForm.value.StartDate
      ),
      StopDate: this._messengerSvc.reformatDate(
        this.updateEducationForm.value.StopDate
      ),
      UpdatedBy: this.onGetUpdatedBy(),
    };

    let subscription = this._educationSvc
      .updateEducation(formData, this.educationId)
      .subscribe((response: any) => {
        if (response) {
          
          this.responseMsg = response.ResponseMessage;
          setTimeout(() => {
            // this._router.navigate([
            //   '/edit-candidate-cv/education',
            // ]);
            this.onCloseForm();
          }, 2000);
        }
      });
    this.Subscriptions.push(subscription);
  }

  onCloseForm() {
    this.closeIsUpdateEducation.emit(false);
    this.dialogRef.close('close');
    
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
