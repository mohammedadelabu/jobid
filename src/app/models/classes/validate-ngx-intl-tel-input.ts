export class ValidateNgxIntlTelInput {
  PhoneNumber: any;
  isBoolean: any;
  constructor(PhoneNumber: any, isBoolean: any) {
    this.PhoneNumber = PhoneNumber;
    this.isBoolean = isBoolean;
  }

  check() {
    if (!this.PhoneNumber) {
      this.isBoolean = true;
    } else {
      this.isBoolean = false;
    }
    return this.isBoolean;
  }
}
