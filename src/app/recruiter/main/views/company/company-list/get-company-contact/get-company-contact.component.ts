import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { CompanyContactListDialogComponent } from '../company-contact-list-dialog/company-contact-list-dialog.component';

@Component({
  selector: 'app-get-company-contact',
  templateUrl: './get-company-contact.component.html',
  styleUrls: ['./get-company-contact.component.scss'],
})
export class GetCompanyContactComponent implements OnInit, OnDestroy {
  @Input('companyId') companyId!: string;
  companyContactList: any;
  multiple = 2;
  uiList: any;
  subscriptions: Subscription[] = [];
  constructor(private _companySvc: CompanyService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCompanyContacts();
  }

  getCompanyContacts() {
    let subscription = this._companySvc
      .getCompanyContacts(this.companyId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.companyContactList = response?.Data;
            this.uiList = response?.Data.slice(0, 3);
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  onOpenContactListDialog() {
    // alert("Hello!");
    const dialogRef = this.dialog.open(CompanyContactListDialogComponent, {
      width: '100%',
      data: {
        companyList: this.companyContactList,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
