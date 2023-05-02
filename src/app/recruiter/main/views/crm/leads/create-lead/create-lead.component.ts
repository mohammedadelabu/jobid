import { NgRedux, select } from '@angular-redux/store';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Country } from 'src/app/models/types/country';
import { Lead } from 'src/app/models/types/lead';
import { CountryListService } from 'src/app/services/country-list.service';
import { IdentityService } from 'src/app/services/identity.service';
import { LeadTagService } from 'src/app/services/lead-tag.service';
import { LeadService, Tag } from 'src/app/services/lead.service';
import { IAppState } from 'src/STORE/store';
import {
  ADD_LEAD,
  ADD_LEAD_ERROR,
  ADD_LEAD_SUCCESS,
} from 'src/STORE/_lead.store/lead.actions';

@Component({
  selector: 'app-create-lead',
  templateUrl: './create-lead.component.html',
  styleUrls: ['./create-lead.component.scss'],
})
export class CreateLeadComponent implements OnInit {
  @select((s) => s.leadTags.leadTags) leadTags$: any;
  CreateLeadForm!: FormGroup;
  countryList!: Country[];
  responseMessage: any;
  dropdownList: { item_id: number; item_text: string }[] = [];
  dropdownSettings: IDropdownSettings = {};
  selectedItems: { item_id: number; item_text: string }[] = [];
  isShowDropOptions: boolean = false;
  country!: any;
  dropDownDataList: Tag[] = [];
  selectedItemsList: any;
  limit: number = 3;
  UIList: any;
  tag: any;
  addNewTag: boolean = false;
  SelectedForApi: any;
  isphoneNumberError = false;
  formErrorMsg!: string;
  isSending = false;
  btnLabel: string = "Create";

  @ViewChild('toggleButton') toggleButton!: ElementRef;
  @ViewChild('menu') menu!: ElementRef;
  SelectedTag: any;


  constructor(
    private _fb: FormBuilder,
    private _countryListSvc: CountryListService,
    private _leadSvc: LeadService,
    private _identitySvc: IdentityService,
    private ngRedux: NgRedux<IAppState>,
    private _leadTagSvc: LeadTagService,
    private _router: Router,
    private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.buildForm();
    this.getCountryList();
    this.multiSeletData();
    this.fetchSelectedItems();
    this.onGetLeadTags();
    this.onResetTagChecks();
  }

  onChecked() {
    this.fetchSelectedItems();
  }

  fetchSelectedItems() {
    this.selectedItemsList = this.dropDownDataList.filter((value, index) => {
      return value.isChecked;
    });
    this.UIList = this.selectedItemsList.slice(0, this.limit);
    this.SelectedForApi = this.selectedItemsList.map((s: any) => {
      let y = {
        Id: s.id,
        Name: s.name,
        DateModified: new Date(),
        DateCreated: s.dateCreated,
      };
      return y;
    });
  }

  toggleaddNewTag() {
    this.addNewTag = !this.addNewTag;
  }
  ClosetoggleaddNewTag(){
    this.addNewTag = false;
  }

  onGetLeadTags() {
    // this.dropDownDataList = this._leadSvc.GetLeadTags();
    // this.fetchSelectedItems();
    this._leadTagSvc.LoadLeadTags();
    // this._leadTagSvc.GetAllLeadTags().subscribe({
    this.leadTags$.subscribe({
      next: (response: any) => {
        if (response) {
          this.dropDownDataList = response.reverse();
          this.fetchSelectedItems();
        }
      },
      error: (err: any) => {
        if (err) {
        }
      },
    });
  }


  onAddNewTag() {
    const Payload = {
      Name: this.tag,
    };

    this._leadTagSvc.AddLeadTag(Payload).subscribe({
      next: (response: any) => {
        if (response) {
          this.tag = null;
          this.onGetLeadTags();
        }
      },
      error: (err: any) => {
        if (err) {
        }
      },
    });
    // const Payload: Tag = {
    //   id: this.dropDownDataList.length + 1,
    //   name: this.tag,
    //   isChecked: true,
    // };
    // this._leadSvc.AddLeadTag(Payload);
    // this.tag = '';
    // this.fetchSelectedItems();
  }

  buildForm() {
    this.CreateLeadForm = this._fb.group({
      AccountName: ['', [Validators.required]],
      // EmailAddress: ['', [Validators.required, Validators.email]],
      EmailAddress: ['', [Validators.email]],
      // PhoneNumber: ['', [Validators.required]],
      PhoneNumber: [''],
      // Tag: [[], Validators.required],
      Tag: [[]],
    });
  }

  get SelectedTags() {
    return this.CreateLeadForm.get('Tag')?.value;
  }

  toggleIsShowDropOptions() {
    this.isShowDropOptions = !this.isShowDropOptions;
  }

  multiSeletData() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' },
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  onItemSelect(item: any) {
    // console.log(item);
  }
  onSelectAll(items: any) {
    // console.log(items);
  }

  getCountryList() {
    this.countryList = this._countryListSvc.getCountryList();
    // console.log('countries: ', this._countryListSvc.getCountryList());
  }

  onGetUpdatedBy() {
    let updatedBy = this._identitySvc.updatedBy();

    return updatedBy;
  }

  onSubmit() {
    let pNumber = this.CreateLeadForm.value.PhoneNumber?.internationalNumber;
    let pTag = this.SelectedTag;
    if(!pNumber){
      pNumber = '';
    }
    if(!pTag){
      pTag = [];
    }

    const Payload: Lead = {
      AccountName: this.CreateLeadForm.value.AccountName,
      EmailAddress: this.CreateLeadForm.value.EmailAddress,
      PhoneNumber: pNumber,
      // Tag: this.CreateLeadForm.value.Tag,
      Tag: pTag
      // Tag: this.SelectedForApi,
      // UpdatedBy: this.onGetUpdatedBy(),
      // LastUpdate: new Date(),
    };
    console.log(Payload)

    // if (this.CreateLeadForm.value.PhoneNumber === null) {
    //   this.isphoneNumberError = true;
    //   return;
    // }
    // if (this.isphoneNumberError) {
    //   this.isphoneNumberError = false;
    // }

    this.CreateLead(Payload);
  }



  onChange(event: any) {
    console.warn("event: ", event)
    this.SelectedTag = event
    // this.valueChange.emit(this.selectedValues);
  }

  CreateLead(NewLead: Lead) {
    // if (!NewLead.AccountName || !NewLead.EmailAddress || !NewLead.PhoneNumber) {
    if (!NewLead.AccountName) {
      this.formErrorMsg = 'Please complete form data!';
      return;
    }
    this.ngRedux.dispatch({ type: ADD_LEAD });
    this.isSending = true;
    this.btnLabel = "Sending...";
    this._leadSvc.AddLead(NewLead).subscribe({
      next: (response: any) => {

      //   if (response) {
      //     this.responseMessage = 'Lead successfully created!';
      //     this.toastr.success(this.responseMessage);
      //     this.CreateLeadForm.reset();
      //     this.ngRedux.dispatch({ type: ADD_LEAD_SUCCESS, payload: NewLead });
      //     this._router.navigate(['/recruiter/crm/leads']);
      //     this.onResetTagChecks();
      //     this.isSending = false;
      //     this.btnLabel = "Create";
      //     this._leadSvc.LeadMessengerSubject.next(this.responseMessage);
      //   }
      // },

        if (response) {
          this.responseMessage = 'Lead added successfully!';
          this.toastr.success(this.responseMessage);
          this.CreateLeadForm.reset();
          this.ngRedux.dispatch({ type: ADD_LEAD_SUCCESS, payload: NewLead });
          this._router.navigate(['/recruiter/crm/leads']);
          this.onResetTagChecks();
          this.isSending = false;
          this.btnLabel = "Create";
          this._leadSvc.LeadMessengerSubject.next(this.responseMessage);
        }
      },


      error: (err: any) => {
        console.warn('Error: ', err);
        this.isSending = false;
        this.btnLabel = "Create";
        // this.toastr.error("Create lead failed!");
        // this.responseMessage = 'An account is registered with either this phone number or an email for an existing Lead.';
        this.responseMessage = 'An account is registered with this email for an existing Lead.';
        this.toastr.error(this.responseMessage);
        this.ngRedux.dispatch({ type: ADD_LEAD_ERROR, payload: err });
      },
    });
  }

  onResetTagChecks() {
    this.leadTags$.subscribe({
      next: (response: any) => {
        if (response) {
          this.dropDownDataList.forEach((t: any) => {
            t.isChecked = false;
          });
          this.fetchSelectedItems();
        }
      },
      error: (err: any) => {
        if (err) {
        }
      },
    });
  }
  onRemoveTag(tag: any) {
    tag.isChecked = false;
    this.fetchSelectedItems();
  }

  goBack() {
    history.back();
  }
}
