import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
})
export class BranchesComponent implements OnInit {
  HQList: any;
  BranchOfficeList: any;
  constructor() {}

  ngOnInit(): void {
  }
}
