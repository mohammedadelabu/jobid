import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-multi-application-request',
  templateUrl: './multi-application-request.component.html',
  styleUrls: ['./multi-application-request.component.scss'],
})
export class MultiApplicationRequestComponent implements OnInit {
  dropdownList: any = [];
  selectedItems: any = [];
  dropdownSettings: any;
  ApplicationForm!: FormGroup;

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    this.multiSelectOptions();
  }

  multiSelectOptions() {
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
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  buildForm() {
    this.ApplicationForm = this._fb.group({
      Candidates: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('this.ApplicationForm: ', this.ApplicationForm.value);
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
