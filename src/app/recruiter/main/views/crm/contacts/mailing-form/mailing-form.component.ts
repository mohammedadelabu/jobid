import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-mailing-form',
  templateUrl: './mailing-form.component.html',
  styleUrls: ['./mailing-form.component.scss'],
})
export class MailingFormComponent implements OnInit {
  textValue = 'jbljl, hgffgg';
  emailAddress = ['iballi2017@gmail.com', 'alli@zarttech.com'];

  //
  dropdownList: X[] = [];
  selectedItems: X[] = [];
  dropdownSettings: IDropdownSettings = {};

  MailForm!: FormGroup;
  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' },
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };

    this.MailForm = this._fb.group({
      Message: '',
      EmailAddress: '',
    });
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  onSubmit() {
    console.log('MailForm: ', this.MailForm.value);
  }
}

export interface X {
  item_id: number;
  item_text: string;
}
