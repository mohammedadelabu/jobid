import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Requisition } from 'src/app/models/types/requisition';
import { UpdateRequisitionStatusComponent } from '../update-requisition-status/update-requisition-status.component';

@Component({
  selector: 'app-requisition-status-button',
  templateUrl: './requisition-status-button.component.html',
  styleUrls: ['./requisition-status-button.component.scss'],
})
export class RequisitionStatusButtonComponent implements OnInit {
  @Input('requisition') requisition!: Requisition;
  RequisitionStatus!:string;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    // console.log('requisition: ', this.requisition);
    this.RequisitionStatus = this.requisition?.RequisitionStatus;
  }

  openUpdateRequisitionSatausFormDialog(Data: any) {
    this.dialog.open(UpdateRequisitionStatusComponent, {
      // maxHeight: '100%',
      minWidth: '650px',
      data: {
        requisition: Data,
      },
    });
  }
}
