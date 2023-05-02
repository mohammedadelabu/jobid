import { NgRedux, select } from '@angular-redux/store';
import { AfterContentInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { isThursday } from 'date-fns';
import { CountryListService } from 'src/app/services/country-list.service';
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
  selector: 'app-update-lead',
  templateUrl: './update-lead.component.html',
  styleUrls: ['./update-lead.component.scss'],
})
export class UpdateLeadComponent implements OnInit, AfterContentInit {
  @select((s) => s.leads.leadTags) leadTags$: any;
  @select((s) => s.leads.isLoading) isLoading$: any;
  UpdateLeadForm!: FormGroup;
  responseMessage: any;
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
  constructor(
    private _fb: FormBuilder,
    private _countryListSvc: CountryListService,
    private _leadSvc: LeadService,
    private _identitySvc: IdentityService,
    public dialogRef: MatDialogRef<UpdateLeadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { lead: any },
    private ngRedux: NgRedux<IAppState>,
    private _leadTagSvc: LeadTagService
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.fetchSelectedItems();
    // console.log('lead data: ', this.data.lead);
  }

  ngAfterContentInit(): void {
    console.log('lead data: ', this.data.lead);
    this.Lead = this.data.lead;
    console.log('this.Lead: ', this.Lead);
    this.buildForm();
    this.onGetLeadTags();
    this.getLeadItemTag(this.Lead?.Tag);
    this.getSystemLeadTags();
    this.fetchSelectedItems();
    this._leadTagSvc.LoadLeadTags();
  }

  getLeadItemTag(TagList: []) {
    console.log('lead tags>>>>: ', TagList);
    this.itemTags = TagList;
  }

  getSystemLeadTags() {
    this.leadTags$.subscribe({
      next: (tagLists: any[]) => {
        console.log('tagLists: ', tagLists);
        for (let i = 0; i < this.Lead?.Tag?.length; i++) {
          console.log("this.Lead?.Tag: ", this.Lead?.Tag[i])
          this.modify(this.Lead?.Tag[i]?.Id, tagLists);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
  }

  modify(tagId: any, existingTagArray: any) {
    existingTagArray.forEach((item: any) => {
      if (item?.id == tagId) {
        item.isChecked = true;
      }
    });
    console.log('existingTagArray: ', existingTagArray);
    this.leadTags = existingTagArray;
  }

  onChecked() {
    this.fetchSelectedItems();
  }

  fetchSelectedItems() {
    let q;
    let w;
    if (this.leadTags) {
      q = this.leadTags;
      console.log('q: ', q);
      w = [...q];
      console.log('w: ', w);
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

  buildForm() {
    this.UpdateLeadForm = this._fb.group({
      AccountName: [this.Lead?.AccountName, [Validators.required]],
      EmailAddress: [
        this.Lead?.EmailAddress,
        [Validators.required, Validators.email],
      ],
      PhoneNumber: [this.Lead?.PhoneNumber, [Validators.required]],
    });
  }

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();
    return updatedBy;
  }

  onSubmit() {
    console.log('form data: ', this.UpdateLeadForm.value);
    const Payload = {
      Id: this.data.lead.Id,
      AccountName: this.UpdateLeadForm.value.AccountName,
      EmailAddress: this.UpdateLeadForm.value.EmailAddress,
      PhoneNumber: this.UpdateLeadForm.value.PhoneNumber,
      Tag: this.SelectedForApi,
      // UpdatedBy: this.onGetUpdatedBy(),
      // LastUpdate: new Date(),
    };

    this.ngRedux.dispatch({ type: UPDATE_LEAD });

    this._leadSvc.UpdateLead(Payload, this.Lead?.Id).subscribe({
      next: (response: any) => {

        if (response.ResponseCode == '200') {
          this.responseMessage = 'Update successful';
          this.UpdateLeadForm.reset();
          this.ngRedux.dispatch({
            type: UPDATE_LEAD_SUCCESS,
            payload: Payload,
          });
          setTimeout(() => {
            this.responseMessage = '';
            // this._leadSvc.sendLeadMessageSubject('Lead Updated!');
            this.closeDialog();
          }, 2000);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
        this.ngRedux.dispatch({ type: UPDATE_LEAD_ERROR, payload: err });
      },
    });
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }

  //

  toggleIsShowDropOptions() {
    this.isShowDropOptions = !this.isShowDropOptions;
  }

  toggleaddNewTag() {
    this.addNewTag = !this.addNewTag;
  }

  onAddNewTag() {
    console.log('tag: ', this.tag);
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

  onGetLeadTags() {
    // this._leadTagSvc.LoadLeadTags();
    // this.leadTags$.subscribe({
    //   next: (response: any) => {
    //     if (response) {
    //
    //       this.dropDownDataList = response.reverse();
    //       this.fetchSelectedItems();
    //     }
    //   },
    //   error: (err: any) => {
    //     if (err) {
    //
    //     }
    //   },
    // });
  }
}
