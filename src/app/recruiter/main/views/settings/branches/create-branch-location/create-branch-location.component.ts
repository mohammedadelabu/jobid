import { NgRedux, select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { buildQueryParams } from 'src/app/helpers/buildQueryParams';
import {
  BranchLocation,
  BranchLocationService,
  BranchType,
} from 'src/app/services/branch-location.service';
import { IdentityService } from 'src/app/services/identity.service';
import { LocationService } from 'src/app/services/location.service';
import { IAppState } from 'src/STORE/store';
import {
  ADD_BRANCH_LOCATION,
  ADD_BRANCH_LOCATION_ERROR,
  ADD_BRANCH_LOCATION_SUCCESS,
  ADD_HQ_LOCATION_SUCCESS,
} from 'src/STORE/_branchLocation.store/branchLocation.actions';
import { CreateAdminRoleDialogComponent } from '../../components/create-admin-role-dialog/create-admin-role-dialog.component';

@Component({
  selector: 'app-create-branch-location',
  templateUrl: './create-branch-location.component.html',
  styleUrls: ['./create-branch-location.component.scss'],
})
export class CreateBranchLocationComponent implements OnInit, OnDestroy {
  @select((s) => s.locations.locationList) LocationList$: any;
  @select((s) => s.locations.isLocationListLoading) isLocationListLoading$: any;
  CreateBranchLocationForm!: FormGroup;
  Subscriptions: Subscription[] = [];
  BranchTypeList = [
    {
      Name: BranchType.HQ,
      Value: 'HeadQuater',
    },
    {
      Name: BranchType.BRANCH_OFFICE,
      Value: 'Branch',
    },
  ];
  isSending: boolean = false;
  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateAdminRoleDialogComponent>,
    private _locationSvc: LocationService,
    private _branchLocationSvc: BranchLocationService,
    private _identitySvc: IdentityService,
    private ngRedux: NgRedux<IAppState>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.onGetCountryLocation();
  }

  buildForm() {
    this.CreateBranchLocationForm = this._fb.group({
      BranchName: ['', [Validators.required]],
      BranchType: ['', [Validators.required]],
      Street: '',
      City: '',
      PostalCode: '',
      Country: '',
    });
  }

  onGetCountryLocation() {
    this._locationSvc.LoadLocations();
  }

  onGetUpdatedBy() {
    // let updatedBy = this._identitySvc.updatedBy();
    let updatedBy = this._identitySvc.loggedInUserId;

    return updatedBy;
  }

  onSubmit() {
    const Payload: BranchLocation = {
      BranchName: this.CreateBranchLocationForm.value.BranchName,
      BranchType: this.CreateBranchLocationForm.value.BranchType,
      Street: this.CreateBranchLocationForm.value.Street,
      City: this.CreateBranchLocationForm.value.City,
      Country: this.CreateBranchLocationForm.value.Country,
      PostalCode: this.CreateBranchLocationForm.value.PostalCode,
      // CreatedBy: this.onGetUpdatedBy(),
      // id: this.onGetUpdatedBy(),
    };

    console.warn('Payload: ', Payload);

    let BranchQuery = {
      Street: Payload.Street,
      City: Payload.City,
      Country: Payload.Country,
      PostCode: Payload.PostalCode,
      Name: Payload.BranchName,
      branchType: Payload.BranchType,
    };

    if (this.CreateBranchLocationForm.valid) {
      this.isSending = true;
      this.ngRedux.dispatch({ type: ADD_BRANCH_LOCATION });
      let subscription = this._branchLocationSvc
        .CreateBranchLocation(Payload, buildQueryParams(BranchQuery))
        .subscribe({
          next: (response: any) => {
            console.log('response: ', response);
            this.isSending = false;
            if (response.ResponseCode == '200') {
              this.toastr.success('Branch successfully created!');
            }
            let responseMessage = response?.ResponseMessage;
            this.toastr.info(responseMessage);
            if (response.ResponseCode == '200') {
              console.warn('Payload for switch: ', Payload);
              // if (Payload.BranchType == 'HeadQuater') {
              //   let payload = { ...Payload, BranchType: 1 };
              //   console.warn('Payload for QH: ', payload);
              //   this.ngRedux.dispatch({
              //     type: ADD_HQ_LOCATION_SUCCESS,
              //     payload: payload,
              //   });
              // }
              // if (Payload.BranchType == 'Branch') {
              //   let payload = { ...Payload, BranchType: 2 };
              //   console.warn('Payload for B: ', payload);
              //   this.ngRedux.dispatch({
              //     type: ADD_BRANCH_LOCATION_SUCCESS,
              //     payload: payload,
              //   });
              // }
              let payload;
              switch (Payload.BranchType) {
                case 'HeadQuater':
                  payload = { ...Payload, BranchType: 1 };
                  this.ngRedux.dispatch({
                    type: ADD_HQ_LOCATION_SUCCESS,
                    payload: payload,
                  });
                  break;
                case 'Branch':
                  payload = { ...Payload, BranchType: 2 };
                  this.ngRedux.dispatch({
                    type: ADD_BRANCH_LOCATION_SUCCESS,
                    payload: payload,
                  });
                  break;

                default:
                  break;
              }
              this.ngRedux.dispatch({
                type: ADD_BRANCH_LOCATION_SUCCESS,
                payload: Payload,
              });
              this.CreateBranchLocationForm.reset();
              this.cancelDialog();
            }
          },
          error: (err: any) => {
            if (err) {
              this.isSending = false;
              this.toastr.error('Creating role failed, try again!');
              console.warn('Error: ', err);
              this.ngRedux.dispatch({
                type: ADD_BRANCH_LOCATION_ERROR,
                payload: err,
              });
            }
          },
        });
      this.Subscriptions.push(subscription);
    }
  }

  cancelDialog() {
    this.dialogRef.close('closed!');
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
