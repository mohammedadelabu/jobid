import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PermissionName } from 'src/app/services/admin-role-and-permission.service';
import { ContactListService } from 'src/app/services/contact-list.service';
import { SendLeadEmailMessageFormDialogComponent } from '../../leads/send-lead-email-message-form-dialog/send-lead-email-message-form-dialog.component';
import { MailingFormComponent } from '../mailing-form/mailing-form.component';

@Component({
  selector: 'app-contact-list-table',
  templateUrl: './contact-list-table.component.html',
  styleUrls: ['./contact-list-table.component.scss'],
})
export class ContactListTableComponent implements OnInit {
  @Input() contactList!: any[];
  @Output() GetEmailList = new EventEmitter();
  @Output() GetSelectedContactList = new EventEmitter();
  @Input() paginationData: any;
  selectAllCheckbox = false;
  EmailList: string[] = [];
  SelectedContactList: any[] = [];
  Delete = PermissionName.Delete;
  Update = PermissionName.Update;
  constructor(
    public dialog: MatDialog,
    private _contactListSvc: ContactListService
  ) {}

  ngOnInit(): void {
    this.onGetEmailList();
  }

  onGetEmailList() {
    this.GetEmailList.emit(this.EmailList);
    this.GetSelectedContactList.emit(this.SelectedContactList);
  }

  openMailerDialog(ContactEmailAddress: string) {
    console.log('ContactEmailAddress: ', ContactEmailAddress);

    console.log('this.EmailList: ', [ContactEmailAddress]);
    const dialogRef = this.dialog.open(
      SendLeadEmailMessageFormDialogComponent,
      {
        width: '100%',
        maxWidth: '700px',
        data: {
          EmailAddressList: [ContactEmailAddress],
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      
    });

    // const dialogRef = this.dialog.open(MailingFormComponent, {
    //   width: '700px',
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   
    // });
  }

  onChange($event: any) {}

  onRemove(item: any) {
    const confirmation = confirm(
      'Are you sure you want to delete this contact?'
    );
    if (confirmation) {
      this._contactListSvc.RemoveContact(item?.Id).subscribe({
        next: (response: any) => {
          if (response) {
            
            this._contactListSvc.LoadContactList();
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

  onSelectLead(item: any) {

    if (item.isChecked) {
      if (this.EmailList.length > 0) {
        let isExist = this.EmailList.find((f: any) => f == item.EmailAddress);
        // console.log('isExist: ', isExist);
        if (isExist) {
          return;
        } else {
          this.EmailList.push(item.EmailAddress);
          this.SelectedContactList.push(item);
          this.onGetEmailList();
        }
      } else {
        this.EmailList.push(item.EmailAddress);
        this.SelectedContactList.push(item);
        this.onGetEmailList();
      }
    } else {
      if (this.EmailList.length > 0) {
        let email_list = [...this.EmailList];
        this.EmailList = email_list.filter((f: any) => f != item.EmailAddress);
        let contact_list = [...this.SelectedContactList];
        this.SelectedContactList = contact_list.filter((f: any) => f.Id != item.Id);
        this.onGetEmailList();
      }
    }
    // console.log('this.EmailList: ', this.EmailList);
    // console.log('this.SelectedContactList: ', this.SelectedContactList);
  }

  onSelectLeadAll() {
    if (this.selectAllCheckbox) {
      this.appendIsCheckProperty(true);
      this.onGetEmailList();
    } else {
      this.appendIsCheckProperty(false);
      this.onGetEmailList();
    }
  }

  appendIsCheckProperty(BooleanValue: boolean) {
    const newContactList: any[] = [];
    this.contactList.map((l: any) => {
      let m = { ...l, isChecked: BooleanValue };
      newContactList.push(m);
      this.contactList = newContactList;
    });

    if (BooleanValue) {
      for (let t in newContactList) {
        this.EmailList.push(newContactList[t].EmailAddress);
        this.SelectedContactList.push(newContactList[t]);
      }
    } else {
      for (let t in newContactList) {
        if (this.EmailList.length > 0) {
          let email_list = [...this.EmailList];
          this.EmailList = email_list.filter(
            (f: any) => f != newContactList[t].EmailAddress
          );
          // console.log('this.EmailList: ', this.EmailList);
        }

        if (this.SelectedContactList.length > 0) {
          let lead_list = [...this.SelectedContactList];
          this.SelectedContactList = lead_list.filter(
            (f: any) => f.Id != newContactList[t].Id
          );
          console.log('this.SelectedContactList: ', this.SelectedContactList);
        }
        
      }
    }
    
    // console.log('this.SelectedContactList: ', this.SelectedContactList);
  }

  openEmailMessageDialog() {
    console.log('this.EmailList: ', this.EmailList);
    const dialogRef = this.dialog.open(
      SendLeadEmailMessageFormDialogComponent,
      {
        width: '100%',
        maxWidth: '700px',
        data: {
          EmailAddressList: this.EmailList,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      
    });
  }
}
