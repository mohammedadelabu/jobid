import { NgRedux, select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidateNgxIntlTelInput } from 'src/app/models/classes/validate-ngx-intl-tel-input';
import { IdentityService } from 'src/app/services/identity.service';
import { LeadTagService } from 'src/app/services/lead-tag.service';
import { LeadService, Tag } from 'src/app/services/lead.service';
import { IAppState } from 'src/STORE/store';
import {
  UPDATE_LEAD,
  UPDATE_LEAD_ERROR,
  UPDATE_LEAD_SUCCESS,
} from 'src/STORE/_lead.store/lead.actions';

@Component({
  selector: 'app-edit-lead',
  templateUrl: './edit-lead.component.html',
  styleUrls: ['./edit-lead.component.scss'],
})
export class EditLeadComponent implements OnInit {
  @select((s) => s.leadTags.leadTags) leadTags$: any;
  @select((s) => s.leadTags.isLoading) isLoading$: any;
  UpdateLeadForm!: FormGroup;
  Lead: any;
  isShowDropOptions: boolean = true;
  addNewTag: boolean = false;
  tag: any;
  dropDownDataList: Tag[] = [];
  selectedItemsList: any;
  UIList: any;
  SelectedForApi: any;
  limit: number = 3;
  leadTags: any;
  itemTags: any;
  userLeadTags!: Tag[];
  leadId: any;
  isphoneNumberError: any;
  isUpdating: boolean = false;
  SelectedTag: any;

  constructor(
    private _route: ActivatedRoute,
    private _LeadSvc: LeadService,
    private _fb: FormBuilder,
    private _leadSvc: LeadService,
    private _identitySvc: IdentityService,
    private ngRedux: NgRedux<IAppState>,
    private _leadTagSvc: LeadTagService,
    private _router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getParams();
    this.buildForm();
    this.onGetLeadTags();
    this.getSystemLeadTags();
    this.fetchSelectedItems();
  }

  getParams() {
    this._route.paramMap.subscribe((params: any) => {
      if (params) {
        let leadId = params.get('leadId');
        this.leadId = leadId;
        this.getLeadDetails(leadId);
      }
    });
  }

  buildForm() {
    this.UpdateLeadForm = this._fb.group({
      AccountName: ['', [Validators.required]],
      EmailAddress: [
        this.Lead?.EmailAddress,
        [Validators.required, Validators.email],
      ],
      PhoneNumber: [this.Lead?.PhoneNumber, [Validators.required]],
      Tag: [{
        id: "d",
        name: "alli"
      }],
    });
  }

  getLeadItemTag(TagList: []) {
    this.itemTags = TagList;
  }

  getSystemLeadTags() {
    this._leadTagSvc.LoadLeadTags();
    this.leadTags$.subscribe({
      next: (tagLists: any[]) => {
        if (tagLists) {
          // RESET PREVIOUS CHECKBOXES
          tagLists.forEach((s: any) => {
            s.isChecked = false;
          });
          console.group("this.Lead?.Tag: ", this.Lead?.Tag)
          if (this.Lead?.Tag) {
            for (let i = 0; i < this.Lead?.Tag?.length; i++) {
              // MODIFY FOR NEW CHECKBOXES
              this.modify(this.Lead?.Tag[i]?.Id, tagLists);
            }
          } else {
            this.leadTags = tagLists;
          }
          console.log("tagLists: ", tagLists);

          // for (let i = 0; i < this.Lead?.Tag?.length; i++) {
          //   // MODIFY FOR NEW CHECKBOXES
          //   this.modify(this.Lead?.Tag[i]?.Id, tagLists);
          // }
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
  }

  getLeadDetails(LeadId: string) {
    this._LeadSvc.GetLeadDetails(LeadId).subscribe({
      next: (response: any) => {
        if (response) {
          console.log(response);

          this.Lead = response?.Data;
          this.getLeadItemTag(this.Lead?.Tag);
          this.fetchSelectedItems();
          this.UpdateLeadForm.controls['AccountName'].setValue(
            this.Lead.AccountName
          );
          this.UpdateLeadForm.controls['EmailAddress'].setValue(
            this.Lead.EmailAddress
          );
          this.UpdateLeadForm.controls['PhoneNumber'].setValue(
            this.Lead.PhoneNumber
          );
          console.log(this.UpdateLeadForm.value)

          this.UpdateLeadForm.controls['Tag'].setValue(
            [
              ...this.Lead.Tag.map((tag: any) => {
                return {
                  id: tag.Id,
                  name: tag.Name
                }
              })
            ]
          );

          this.UpdateLeadForm.controls['AccountName'].addValidators(Validators.required)
          this.UpdateLeadForm.controls['EmailAddress'].addValidators(Validators.required)
          this.UpdateLeadForm.controls['PhoneNumber'].addValidators(Validators.required)
          this.UpdateLeadForm.controls['Tag'].addValidators(Validators.required)
          this.UpdateLeadForm.updateValueAndValidity()
          console.log(this.UpdateLeadForm.value)
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn('Error: ', err);
        }
      },
    });
  }

  compareFn(tag1: any, tag2: any) {
    return tag1 && tag2 ? tag1.id === tag2.id : tag1 === tag2;
  }

  modify(tagId: any, existingTagArray: any) {
    existingTagArray.forEach((item: any) => {
      if (item?.id == tagId) {
        item.isChecked = true;
      }
    });
    this.leadTags = existingTagArray;
    console.warn('this.leadTags: ', this.leadTags);
    this.fetchSelectedItems();
  }

  onChecked() {
    this.fetchSelectedItems();
  }

  fetchSelectedItems() {
    let q;
    let w;
    if (this.leadTags) {
      q = this.leadTags;
      w = [...q];
    }
    if (w) {
      // this.selectedItemsList = this.dropDownDataList.filter((value, index) => {
      this.selectedItemsList = w.filter((value, index) => {
        // console.log("tags valuue: ", value);
        return value?.isChecked; // filter the checked items to prefill UI
      });
    }

    if (this.selectedItemsList) {
      this.UIList = this.selectedItemsList.slice(0, this.limit);

      // console.log('this.selectedItemsList: ', this.selectedItemsList);
      this.SelectedForApi = this.selectedItemsList.map((s: any) => {
        // console.log('ss: ', s);
        let y = {
          Id: s.id,
          Name: s.name,
          DateModified: new Date(),
          DateCreated: s.dateCreated,
        };
        return y;
      });
      // console.log('SelectedForApi: ', this.SelectedForApi);
    }
  }

  onGetLeadTags() {
    this._leadTagSvc.LoadLeadTags();


  }

  validatePhoneNumber(PhoneNumber: any, isBoolean: boolean): boolean | any {
    let x = new ValidateNgxIntlTelInput(PhoneNumber, isBoolean);
    return x.check();
  }

  onSubmit() {
    console.log("ysbuydz")
    if(this.UpdateLeadForm.invalid){
      return
    }
    const Payload = {
      Id: this.leadId,
      AccountName: this.UpdateLeadForm.value.AccountName,
      EmailAddress: this.UpdateLeadForm.value.EmailAddress,
      PhoneNumber: this.UpdateLeadForm.value.PhoneNumber?.internationalNumber,
      Tag: this.SelectedTag
      // Tag: this.SelectedForApi,
      // UpdatedBy: this.onGetUpdatedBy(),
      // LastUpdate: new Date(),
    };

    this.isphoneNumberError = this.validatePhoneNumber(
      Payload.PhoneNumber,
      false
    );

    if (!this.isphoneNumberError) {
      this.UpdateLead(Payload, this.Lead?.Id);
    }
  }

  UpdateLead(Payload: any, LeadId: string) {
    this.isUpdating = true;

    // this.ngRedux.dispatch({ type: UPDATE_LEAD });

    this._leadSvc.UpdateLead(Payload, LeadId).subscribe({
      next: (response: any) => {
        if (response.ResponseCode == '200') {
          let responseMessage = 'Update successful';
          this.isUpdating = false;
          this.toastr.success(responseMessage);
          // this.ngRedux.dispatch({
          //   type: UPDATE_LEAD_SUCCESS,
          //   payload: Payload,
          // });
          setTimeout(() => {
            responseMessage = '';
            //   // this._leadSvc.sendLeadMessageSubject('Lead Updated!');
            this._router.navigate(['/recruiter/crm/leads']);
          }, 2000);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
        let errorMessage;
        if (err.status == '404') {
          this.isUpdating = false;
          errorMessage = err.statusText;
          this.toastr.error(errorMessage);
        } else {
          this.toastr.error('Error, try again!');
        }
        // this.ngRedux.dispatch({ type: UPDATE_LEAD_ERROR, payload: err });
      },
    });
  }

  toggleIsShowDropOptions() {
    this.isShowDropOptions = !this.isShowDropOptions;
  }

  onAddNewTag() {
    const Payload = {
      Name: this.tag,
    };

    this._leadTagSvc.AddLeadTag(Payload).subscribe({
      next: (response: any) => {
        if (response) {
          this.onGetLeadTags();
        }
      },
      error: (err: any) => {
        if (err) {
        }
      },
    });
  }

  toggleaddNewTag() {
    this.addNewTag = !this.addNewTag;
  }

  onRemoveTag(tag: any) {
    tag.isChecked = false;
    this.fetchSelectedItems();
  }


  onChange(event: any) {
    console.warn("event: ", event)
    this.SelectedTag = event
    // this.valueChange.emit(this.selectedValues);
  }

  goBack() {
    history.back();
  }
}
