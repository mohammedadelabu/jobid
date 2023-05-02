import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-add-secondary-email-address',
  templateUrl: './add-secondary-email-address.component.html',
  styleUrls: ['./add-secondary-email-address.component.scss'],
})
export class AddSecondaryEmailAddressComponent implements OnInit {
  @Output() closeAddSecondaryEmailAddressForm = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onCloseAddSecondaryEmailAddressForm_() {
    this.closeAddSecondaryEmailAddressForm.emit(false);
  }
}
