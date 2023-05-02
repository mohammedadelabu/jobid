import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PermissionName } from 'src/app/services/admin-role-and-permission.service';
import { IdentityService } from 'src/app/services/identity.service';
import { ScheduleInterviewComponent } from 'src/app/shared/components/schedule-interview/schedule-interview.component';
import { InviteCandidateFormComponent } from '../../components/invite-candidate-form/invite-candidate-form.component';
import { AdminCreateNewCandidateAccountComponent } from './components/admin-create-new-candidate-account/admin-create-new-candidate-account.component';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit, OnDestroy {
  @select((s) => s.candidates.candidatesList) candidatesList$: any;
  @select((s) => s.candidates.isLoading) isCandidatesListLoading$: any;
  listCandidateCards = false;
  UserList: any;
  totalRecords!: string;
  page = 1;
  count = 0;
  reverse = true;
  // ItemsPerPage = 24;
  ItemsPerPage = 24;
  subscriptions: Subscription[] = [];
  candidateProfessionListStyle = {
    // fontFamily: 'Poppins',
    // fontStyle: 'normal',
    // fontWeight: '400',
    // fontSize: '16px',
    // lineHeight: '24px',
    // color: '#000000',
  };

  candidateProfessionGridStyle = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    color: '#b5b5b5',
  };
  // PageNumber: any;
  // PageSize: any;
  Update = PermissionName.Update
  View = PermissionName.View
  Delete = PermissionName.Delete
  Create = PermissionName.Create

  constructor(
    public _dialog: MatDialog,
    private _IdentitySvc: IdentityService,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.onGetAllUsers();
    this._IdentitySvc._LoadAllUsers(this.ItemsPerPage, this.page);
    // this.FetchUsers();
  }

  // FetchUsers() {
  //   let subscription = this._IdentitySvc.getAllUsers(this.ItemsPerPage, this.page).subscribe({
  //     next: (response: any) => {
  //       if (response) {
  //         this.UserList = response?.Data?.Items;
  //         this.page = response?.Data.PageNumber;
  //         this.ItemsPerPage = response?.Data.PageSize;
  //         this.totalRecords = response?.Data.TotalSize;
  //       }
  //     },
  //     error: (err: any) => {
  //       console.warn('Error: ', err);
  //     },
  //   });
  //   this.subscriptions.push(subscription);
  // }

  pageChangeEvent($event: any) {
    this.page = $event;
    console.log("Paginate: ", this.ItemsPerPage, this.page)
    this._IdentitySvc._LoadAllUsers(this.ItemsPerPage, this.page);
  }

  openScheduleInterviewDialog(candidateEmail: string, candidateId: string) {
    const dialogRef = this._dialog.open(ScheduleInterviewComponent, {
      width: '700px',
      data: {
        candidateEmail: candidateEmail,
        candidateId: candidateId,
      },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {
      
    });
    this.subscriptions.push(subscription);
  }

  onItemsPerPage(Count: number) {
    this.ItemsPerPage = 0;
    this.ItemsPerPage += Count;
    console.log(this.ItemsPerPage);
  }

  toggleCards() {
    this.listCandidateCards = !this.listCandidateCards;
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
    this.subscriptions?.push(subscription);
  }
  openCvUploadPage() {
    this._router.navigate(['/recruiter/candidates/upload-candidate-cv']);
  }

  openInvitationDialog() {
    const dialogRef = this._dialog.open(InviteCandidateFormComponent, {
      width: '100%',
      maxWidth: '850px',
    });
    let subscription = dialogRef.afterClosed().subscribe((result) => {
      
    });
    this.subscriptions?.push(subscription);
    // console.warn('this.subscriptions: ', this.subscriptions);
  }

  onGetAllUsers() {
    let subscription = this.candidatesList$.subscribe({
      next: (response: any) => {
        if (response) {
          this.UserList = response?.Items;
          this.page = response?.page;
          this.ItemsPerPage = response?.ItemsPerPage;
          this.totalRecords = response?.totalRecords;
        }
        // Items: UsersList,
        // page: Body.Data?.PageNumber,
        // ItemsPerPage: Body.Data?.PageSize,
        // totalRecords: Body.Data?.TotalSize,
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions?.push(subscription);
  }

  onSortByMostRecent(Property: string) {
    this.UserList?.sort((a: any, b: any) =>
      a[Property] > b[Property] ? 1 : -1
    );
  }

  onSortByOldest(Property: string) {
    this.UserList?.sort((a: any, b: any) =>
      a[Property] > b[Property] ? 1 : -1
    ).reverse();
  }

  onSortByAphabeticalOrder(Property: string) {
    this.UserList?.sort((a: any, b: any) =>
      a[Property] > b[Property] ? -1 : 1
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
