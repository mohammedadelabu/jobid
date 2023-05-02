import { NgRedux, select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PermissionName } from 'src/app/services/admin-role-and-permission.service';
import { CompanyService } from 'src/app/services/company.service';
import { IdentityService } from 'src/app/services/identity.service';
import { SidebarService } from 'src/app/services/sidebar.service';
import { IAppState } from 'src/STORE/store';
import { InviteCandidateFormComponent } from '../../components/invite-candidate-form/invite-candidate-form.component';
import { AdminCreateNewCandidateAccountComponent } from '../candidates/components/admin-create-new-candidate-account/admin-create-new-candidate-account.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  View = PermissionName.View
  Create = PermissionName.Create

  @select((s) => s.candidates.candidatesList) candidatesList$: any;
  @select((s) => s.candidates.isLoading) candidatesListIsLoading$: any;
  @select((s) => s.company.companyList) companyList$: any;
  @select((s) => s.company.isLoading) companyListIsLoading$: any;
  UserList: any;
  companyList: any;
  subscriptions: Subscription[] = [];
  ItemsPerPage = 24;
  page = 1;
  totalRecords: any;

  constructor(
    private _IdentitySvc: IdentityService,
    public _dialog: MatDialog,
    private _companySvc: CompanyService,
    private _router: Router,
    private ngRedux: NgRedux<IAppState>,
    private sbService: SidebarService
  ) {}

  ngOnInit(): void {
    this.sbService.closeSecondaryNav();
    this.onGetAllUsers();
    this.onGetAllCompanies();
  }

  onGetAllUsers() {
    // this._IdentitySvc.LoadAllUsers();
    this._IdentitySvc._LoadAllUsers(this.ItemsPerPage, this.page);
    let subscription = this.candidatesList$.subscribe({
      next: (users: any) => {
        console.log('Users: ', users);
        if (users) {
          // this.UserList = users;
          this.UserList = users?.Items;
          this.page = users?.page;
          this.ItemsPerPage = users?.ItemsPerPage;
          this.totalRecords = users?.totalRecords;
        }

      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
    // let subscription = this._IdentitySvc.getAllUsers().subscribe({
    //   next: (response: any) => {
    //     console.log('Users: ', response);
    //     if (response) {
    //       this.UserList = response?.Data;
    //     }
    //   },
    //   error: (err: any) => {
    //     console.warn('Error: ', err);
    //   },
    // });
    // this.subscriptions.push(subscription);

 
  }

  onGetAllCompanies() {
    this._companySvc.LoadCompanyList();
    let subscription = this.companyList$.subscribe({
      next: (response: any) => {
        if (response) {
          this.companyList = response;
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  openInvitationDialog() {
    const dialogRef = this._dialog.open(InviteCandidateFormComponent, {
      width: '100%',
      maxWidth: '850px',
    });
    let subscription = dialogRef.afterClosed().subscribe((result) => {
      
    });
    this.subscriptions.push(subscription);
  }

  onCreateResume() {
    localStorage.setItem('admin-create-cv-type', 'CREATE_CV');
    this.openRegisterCandidateDialog();
  }

  onUploadResume() {
    localStorage.setItem('admin-create-cv-type', 'UPLOAD_CV');
    // this._route.navigate(['/administrator/edit-candidate-data/upload-cv']);
    this.openCvUploadPage();
  }

  openRegisterCandidateDialog() {
    const dialogRef = this._dialog.open(
      AdminCreateNewCandidateAccountComponent,
      {
        width: '100%',
        maxWidth: '850px',
      }
    );
    let subscription = dialogRef.afterClosed().subscribe((result) => {
      
    });
    this.subscriptions.push(subscription);
  }
  openCvUploadPage() {
    this._router.navigate(['/recruiter/candidates/upload-candidate-cv']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
