import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import {
  BranchLocationService,
  BranchType,
} from 'src/app/services/branch-location.service';

@Component({
  selector: 'app-branch-locations',
  templateUrl: './branch-locations.component.html',
  styleUrls: ['./branch-locations.component.scss'],
})
export class BranchLocationsComponent implements OnInit {
  @select((s) => s.branchLocations.branchLocationList) branchLocationList$: any;
  @select((s) => s.branchLocations.hqLocationList) hqLocationList$: any;
  @select((s) => s.branchLocations.isLoading) isLoading$: any;
  HQList: any;
  BranchOfficeList: any;

  constructor(private _branchLocationSvc: BranchLocationService) {}

  ngOnInit(): void {
    this.getBranchLocationList();
  }

  getBranchLocationList() {
    this._branchLocationSvc.LoadBranchLocationList();
    this.branchLocationList$.subscribe({
      next: (response: any) => {
        if (response) {
          console.log('response branch****: ', response);
          this.BranchOfficeList = response;
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn;
        }
      },
    });
    this.hqLocationList$.subscribe({
      next: (response: any) => {
        if (response) {
          console.log('response hq****: ', response);
          this.HQList = response;
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn;
        }
      },
    });
  }
}
