import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PermissionName } from 'src/app/services/admin-role-and-permission.service';
import { CompanyService } from 'src/app/services/company.service';
import { ContactListService } from 'src/app/services/contact-list.service';
import { ContactPaged, ContactService } from 'src/app/services/contact.service';
import { SendLeadEmailMessageFormDialogComponent } from '../leads/send-lead-email-message-form-dialog/send-lead-email-message-form-dialog.component';
import { MailingFormComponent } from './mailing-form/mailing-form.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-contacts',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {
  @select((s) => s.contactList.contactList) contactList$: any;
  @select((s) => s.contactList.isLoading) isContactListLoading$: any;
  @select((s) => s.company.companyList) companyList$: any;
  @select((s) => s.company.isLoading) iscompanyListLoading$: any;
  contactList: any;
  EmailList: string[] = [];
  SelectedContactList: any[] = [];
  range!: FormGroup;
  companySearch!: FormGroup;
  Delete = PermissionName.Delete;
  isloading: boolean = false;
  companyList: any;
  paginationData = {
    page: 1,
    count: 0,
    reverse: true,
    ItemsPerPage: 50,
    totalRecords: null,
  };

  DateFilterSearchData: any = {
    StartDate: null,
    EndDate: null,
  };

  CompanyFilterSearchData: any = {
    CompanyId: null,
  };

  isSearchLead: boolean = false;
  dateRangeValue: any;
  constructor(
    public dialog: MatDialog,
    private _contactListSvc: ContactListService,
    private _fb: FormBuilder,
    private _companySvc: CompanyService,
    private _contactSvc: ContactService,
    private _toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getContactList();
    this._contactListSvc.LoadContactList();
    this.buildForm();
    this.getCompanyList();
  }

  buildForm() {
    this.range = this._fb.group({
      Start: '',
      End: '',
    });
    this.companySearch = this._fb.group({
      CompanyId: '',
    });
  }

  onDealMultipleLeads() {
    const confirmation = confirm(
      'Are you sure you want to delete contact(s)?'
    );
    if (confirmation) {

      this.isloading = true;
      let idArray = this.SelectedContactList.map((i) => i.Id);
      this._contactListSvc.RemoveBulkContact(idArray).subscribe({
        next: (response: any) => {
          if (response) {
            this.isloading = false;
            console.log(response);
            this._contactListSvc.LoadContactList();
          }
        },
        error: (err: any) => {
          if (err) {
            console.warn('Error: ', err);
            this.isloading = false;
          }
        },
      });
    }
  }

  // onSubmit(EmailMessageForm: any) {
  //   console.log('EmailMessageForm: ', EmailMessageForm.value);
  //   const Payload: SendLeadMail = {
  //     Subject: EmailMessageForm.value.Subject,
  //     Body: EmailMessageForm.value.Message,
  //     Destination: [...this.data.EmailAddressList],
  //   };

  //   if (this.data.EmailAddressList.length == 0) {
  //     this.emptyEmailListMessage = 'Kindly select a lead';
  //   } else {
  //     this._leadSvc.SendLeadEmailMessage(Payload).subscribe({
  //       next: (response: any) => {
  //         if (response) {
  //           this.successResponeMessage = response?.ResponseMessage;
  //           this.emailAddressList = [];
  //           this.Subject = '';
  //           this.Message = '';
  //           this.isMessageSent = true;
  //           setTimeout(() => {
  //             this.closeDialog();
  //           }, 2500);
  //         }
  //       },
  //       error: (err: any) => {
  //         if (err) {
  //           console.warn('Error: ', err);
  //         }
  //       },
  //     });
  //   }
  // }

  openEmailMessageDialog() {
    // console.log('this.EmailList: ', this.EmailList);
    const dialogRef = this.dialog.open(
      SendLeadEmailMessageFormDialogComponent,
      {
        width: '100%',
        maxWidth: '700px',
        data: {
          EmailAddressList: this.EmailList,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => { });
  }

  onGetEmailList($event: any) {
    this.EmailList = $event;
    // console.log('this.EmailList $event: ', $event);
  }

  onSelectedContactList($event: any) {
    this.SelectedContactList = $event;
    console.log('this.SelectedContactList $event: ', $event);
  }

  openDialog() { }

  getContactList() {
    // this._contactListSvc.LoadContactList();
    const Payload: ContactPaged = {
      StartDate: null,
      EndDate: null,
      // CompanyId: "23b1e7c5-4aa4-4b72-9fd5-13d69c2845f9",
      CompanyId: null,
      PageSize: this.paginationData.ItemsPerPage,
      PageNumber: this.paginationData.page,
    };
    this._contactSvc.LoadContactPagedList(Payload);
    this.contactList$.subscribe({
      next: (response: any) => {
        if (response) {
          this.contactList = response;
          console.warn("this.contactList$$: ", this.contactList)
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn('Error: ', err);
        }
      },
    });
  }

  getCompanyList() {
    this._companySvc.LoadCompanyList();
    this.companyList$.subscribe({
      next: (response: any) => {
        if (response) {
          this.companyList = response;
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn('Error: ', err);
        }
      },
    });
  }

  openMailerDialog() {
    const dialogRef = this.dialog.open(MailingFormComponent, {
      width: '700px',
    });
    dialogRef.afterClosed().subscribe((result) => { });
  }

  onChange($event: any) {
    // console.log('onSubmitSearchByDateRangeForm: ', this.range.value);
    // console.log('$event: ', $event.value);
    this.dateRangeValue = $event.value;
    if (!$event.value) {
      this.getCompanyList();
      return;
    }
    const DateSearchData = {
      StartDate: new Date(this.range.value.Start).toDateString(),
      EndDate: new Date(this.range.value.End).toDateString(),
    };
    this.DateFilterSearchData.StartDate = DateSearchData.StartDate;
    this.DateFilterSearchData.EndDate = DateSearchData.EndDate;
    const Payload: ContactPaged = {
      StartDate: this.DateFilterSearchData.StartDate,
      EndDate: this.DateFilterSearchData.EndDate,
      CompanyId: this.CompanyFilterSearchData.CompanyId,
      PageSize: this.paginationData.ItemsPerPage,
      PageNumber: 1,
    };
    this._contactSvc.LoadContactPagedList(Payload);
    this.isSearchLead = true;
  }


  onChangeCompanySearch() {
    const CompanySearchData = {
      CompanyId: this.companySearch.value.CompanyId,
    };
    // console.log("CompanySearchData: ", CompanySearchData?.CompanyId)
    this.CompanyFilterSearchData.CompanyId = CompanySearchData.CompanyId;
    if (this.dateRangeValue) {
      const Payload: ContactPaged = {
        StartDate: this.DateFilterSearchData.StartDate,
        EndDate: this.DateFilterSearchData.EndDate,
        CompanyId: this.CompanyFilterSearchData.CompanyId,
        PageSize: this.paginationData.ItemsPerPage,
        PageNumber: 1,
      };
      this._contactSvc.LoadContactPagedList(Payload);
    } else {
      const Payload: ContactPaged = {
        StartDate: null,
        EndDate: null,
        CompanyId: this.CompanyFilterSearchData.CompanyId,
        PageSize: this.paginationData.ItemsPerPage,
        PageNumber: 1,
      };
      this._contactSvc.LoadContactPagedList(Payload);
    }
    this.isSearchLead = true;
  }


  onRemove(item: any) {
    const confirmation = confirm(
      'Are you sure you want to delete this contact?'
    );
    if (confirmation) {
      this._contactListSvc.RemoveContact(item?.Id).subscribe({
        next: (response: any) => {
          if (response) {
            this._toastr.success(response?.ResponseMessage);
            // console.log('response');
            // console.log('response');
            // console.log('response');
            // console.log(this._toastr.success(response?.ResponseMessage));

            this._contactListSvc.LoadContactList();
          }
        },
        error: (err: any) => {
          if (err) {
            console.warn('Error: ', err);
          }
        },
      });
    }
  }

  pageChangeEvent($event: any) {
    this.paginationData.page = $event;
    const Payload: ContactPaged = {
      StartDate: this.DateFilterSearchData.StartDate,
      EndDate: this.DateFilterSearchData.EndDate,
      CompanyId: this.CompanyFilterSearchData.CompanyId,
      PageSize: this.paginationData.ItemsPerPage,
      PageNumber: this.paginationData.page,
    };
    this._contactSvc.LoadContactPagedList(Payload);
  }



  onGetLeadsList() {
  }
}
