import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from 'src/app/services/company.service';
import { ContactListService } from 'src/app/services/contact-list.service';
import { ContactService } from 'src/app/services/contact.service';
import { IdentityService } from 'src/app/services/identity.service';
import { JobVacancyService } from 'src/app/services/job-vacancy.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { AddCompanyContactComponentDialog } from '../components/add-company-contact/add-company-contact.component';
import { EditCompanyContactComponent } from '../components/edit-company-contact/edit-company-contact.component';
import { GenerateCompanyContactPasswordComponent } from '../components/generate-company-contact-password/generate-company-contact-password.component';
import { ResetCompanyContactPasswordComponent } from '../components/reset-company-contact-password/reset-company-contact-password.component';
// import { AddCompanyContactComponent } from 'src/app/recruiter/main/views/candidates/components/add-company-contact/add-company-contact.component';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss'],
})
export class CompanyDetailsComponent implements OnInit, OnDestroy {
  @select((s) => s.companyContacts.contactList) companyContactList$: any;
  @select((s) => s.companyContacts.isLoading) isCompanyContactListLoading$: any;
  companyId: any;
  companyDetails: any;
  CompanyContactList: any;
  UpdatedBy!: string;
  loggedInUser: any;
  jobVacancyList: any;
  isZarttech!: boolean;
  subscriptions: Subscription[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _companySvc: CompanyService,
    public dialog: MatDialog,
    private _authenticationSvc: AuthenticationService,
    private _identitySvc: IdentityService,
    private _messengerSvc: MessengerService,
    private _jobVacancySvc: JobVacancyService,
    private _contactSvc: ContactService,
    private _contactListSvc: ContactListService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.loggedinUser();
    this.getRouteParams();
    this.onGetJobVacancies();
    this.onGetZarttechInterviewProcess();
  }

  getRouteParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        this.companyId = params.get('companyId');
        console.log(this.companyId);
        localStorage.setItem('COMPANY_ID_FOR_CONTACT', this.companyId);
        this.getCompanyDetails(this.companyId);
        this.onGetCompanyContacts(this.companyId);
        this.subscribeToMsgSvc();
      },
      error: (err: any) => { },
    });
    this.subscriptions.push(subscription);
  }

  subscribeToMsgSvc() {
    let subscription = this._messengerSvc.getSubject().subscribe({
      next: (message: any) => {
        if (message) {
          // console.log('Message: ', message);
          this.onGetCompanyContacts(this.companyId);
        }
      },
    });
    this.subscriptions.push(subscription);
  }

  getCompanyDetails(companyId: string) {
    let subscription = this._companySvc.getCompanyDetails(companyId).subscribe({
      next: (response: any) => {
        if (response) {
          if (response.ResponseCode == '00') {
            this.companyDetails = response.Data;
          }
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetCompanyContacts(CompanyId: any) {
    this._contactSvc.GetCompaniesContact(CompanyId);
    this.companyContactList$.subscribe({
      next: (list: any) => {
        // console.log('list***#: ', list);
        if (list) {
          this.CompanyContactList = list;
        } else {
          this.CompanyContactList = [];
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });

    // let subscription = this._companySvc
    //   .getCompanyContacts(CompanyId)
    //   .subscribe({
    //     next: (response: any) => {
    //       if (response) {
    //         this.CompanyContactList = response.Data;
    //       }
    //     },
    //     error: (err: any) => {},
    //   });
    // this.subscriptions.push(subscription);
  }

  openAddContactDialog() {
    const dialogRef = this.dialog.open(AddCompanyContactComponentDialog, {
      width: '900px',
      data: {
        CompanyId: this.companyId,
        CompanyName: this.companyDetails.Name,
      },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => { });
    this.subscriptions.push(subscription);
  }

  // localStorage.setItem('COMPANY_ID_FOR_CONTACT', this.newCompanyId);

  openEditContactDialog() {
    const dialogRef = this.dialog.open(EditCompanyContactComponent, {
      width: '900px',
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => { });
    this.subscriptions.push(subscription);
  }

  openResetContactPasswordDialog() {
    const dialogRef = this.dialog.open(ResetCompanyContactPasswordComponent, {
      width: '550px',
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => { });
    this.subscriptions.push(subscription);
  }
  openGenerateContactPasswordDialog() {
    const dialogRef = this.dialog.open(
      GenerateCompanyContactPasswordComponent,
      {
        width: '550px',
      }
    );

    let subscription = dialogRef.afterClosed().subscribe((result) => { });
    this.subscriptions.push(subscription);
  }

  removeContact(ContactId: string) {
    console.log('Contact Id: ', ContactId);
    const confirmation = confirm(
      'Are you sure you want to delete this contact?'
    );
    if (confirmation) {
      this._contactListSvc.RemoveContact(ContactId).subscribe({
        next: (response: any) => {
          if (response) {
            console.log("response: ", response)
            this.onGetCompanyContacts(this.companyId);
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

  onEditCompany(CompanyId: string) {
    // console.log(CompanyId);
    this._router.navigate([
      `/recruiter/crm/companies/edit-contact/${CompanyId}`,
    ]);
  }


  updateCandidateData(data: any, ContactEmail: string) {
    let c_data = {
      FirstName: data.FirstName,
      LastName: data.LastName,
      MiddleName: data.MiddleName,
      UserImage: data.UserImage,
      PhoneNumber: data.PhoneNumber,
      Status: data.Status,
      StatusComment: data.StatusComment,
      CV_URL: data.CV_URL,
      PortfolioPlatform: data.PortfolioPlatform,
      LinkedinPlatform: data.LinkedinPlatform,
      UpdatedBy: this.UpdatedBy,
      CompanyId: '',
    };
    console.log('c_data', c_data);
    let subscription = this._identitySvc
      .updatePersonalInfo(c_data, ContactEmail)
      .subscribe({
        next: (response: any) => {
          // console.log('Logged in person', response);
          if (response) {
            this._messengerSvc.sendSubject('Contact removes!');
          }
        },
        error: (err: any) => { },
      });
    this.subscriptions.push(subscription);
  }

  loggedinUser() {
    this.loggedInUser = this._identitySvc.getLoggedInUserData().Id;
    // console.log('this.loggedInUser: ', this.loggedInUser);
    let subscription = this._authenticationSvc
      .getAUthUserDetails(this.loggedInUser)
      .subscribe({
        next: (response: any) => {
          // console.log('Logged in person', response);
          this.UpdatedBy = `${response.FirstName} ${response.LastName}`;
          // console.log('this.UpdatedBy', this.UpdatedBy);
        },
        error: (err: any) => { },
      });
    this.subscriptions.push(subscription);
  }

  onGetJobVacancies() {
    let subscription = this._jobVacancySvc.getJobVacancies().subscribe({
      next: (response: any) => {
        // console.log('Job Vacancies', response);
        if (response.ResponseCode == '00') {
          this.jobVacancyList = response?.Data.filter(
            (vacancyList: any) =>
              vacancyList?.Company.CompanyId == this.companyId
          );
          // console.log('this.jobVacancyList: ', this.jobVacancyList);
        }
      },
      error: (err: any) => {
        console.error('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetZarttechInterviewProcess() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        let companyId = params.get('companyId');
        let zarttechId = '0bbca126-16d6-49e8-d679-08da37fb127e';
        if (companyId === zarttechId) {
          this.isZarttech = true;
        } else {
          this.isZarttech = false;
        }
      },
      error: (err: any) => { },
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
