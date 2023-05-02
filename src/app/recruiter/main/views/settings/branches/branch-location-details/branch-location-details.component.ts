import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BranchLocationService } from 'src/app/services/branch-location.service';

@Component({
  selector: 'app-branch-location-details',
  templateUrl: './branch-location-details.component.html',
  styleUrls: ['./branch-location-details.component.scss'],
})
export class BranchLocationDetailsComponent implements OnInit {
  BranchLocationDetails: any;
  isLoading:boolean = false;
  constructor(
    private _route: ActivatedRoute,
    private _branchLocationSvc: BranchLocationService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getRouteParams();
  }

  getRouteParams() {
    this._route.paramMap.subscribe((params) => {
      if (params) {
        let branchId = params.get('branchId');
        this.onGetBranchLocationDetails(branchId);
      }
    });
  }

  onGetBranchLocationDetails(BranchId: any) {
    this.isLoading = true;
    this._branchLocationSvc.GetBranchLocationById(BranchId).subscribe({
      next: (response: any) => {
        if (response) {
          this.BranchLocationDetails = response?.Data;
          this.isLoading = false;
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn('Error: ', err);
          this.isLoading = false;
        }
      },
    });
  }
  // GetBranchLocationById(Id: string)

  RemoveBranchLocation(Id: string) {
    console.log('Id: ', Id);
    let confirmation = confirm(
      'Are you sure you want to delete this branch location?'
    );
    if (!confirmation) {
      return;
    }
    this._branchLocationSvc.RemoveBranchLocation(Id).subscribe({
      next: (response: any) => {
        if (response) {
          console.log('response: ', response);
          this._router.navigate(['/recruiter/settings/branches']);
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
