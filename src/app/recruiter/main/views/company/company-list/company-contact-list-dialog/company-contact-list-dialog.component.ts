import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-company-contact-list-dialog',
  templateUrl: './company-contact-list-dialog.component.html',
  styleUrls: ['./company-contact-list-dialog.component.scss'],
})
export class CompanyContactListDialogComponent implements OnInit {
  contactList: any;
  constructor(
    public dialogRef: MatDialogRef<CompanyContactListDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {companyList: any}
  ) {}

  ngOnInit(): void {
    console.log("Data: ", this.data.companyList);
    this.contactList = this.data.companyList
  }

  closeDialog() {
    this.dialogRef.close('Pizza!');
  }
}
