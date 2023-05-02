import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-candidate-listing',
  templateUrl: './candidate-listing.component.html',
  styleUrls: ['./candidate-listing.component.scss'],
})
export class CandidateListingComponent implements OnInit {
  @select((s) => s.candidatesList.candidatesList) candidatesList$: any;
  @select((s) => s.candidatesList.isLoading) isLoading: any;
  UserList: any;
  totalRecords!: string;
  page = 1;
  count = 0;
  constructor(private _IdentitySvc: IdentityService) {}

  ngOnInit(): void {}

  onGetAllUsers() {
    this.candidatesList$.subscribe({
      next: (response: any) => {
        console.log('User: ', response);
        if (response) {
          this.UserList = response.Data;
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });

    // this._IdentitySvc.getAllUsers().subscribe({
    //   next: (response: any) => {
    //     console.log('User: ', response);
    //     if (response) {
    //       this.UserList = response.Data;
    //     }
    //   },
    //   error: (err: any) => {
    //     console.warn('Error: ', err);
    //   },
    // });
  }
}
