export class ConvertDate {
  date!: any;
  constructor(date: string) {
    this.date = date;
  }
  // value="2022-07-24"
  getDAteWithoutTime() {
    var d = new Date(this.date);
    var NoTimeDate =
      d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    return NoTimeDate;
  }
}

// “How do I convert yyyy-mm-ddT00:00:00.000Z format to Dateatime in javascript?” Code Answer’s
// source: https://www.codegrepper.com/code-examples/javascript/How+do+I+convert+yyyy-mm-ddT00%3A00%3A00.000Z+format+to+Dateatime+in+javascript%3F
export class ConvertDateTime {
  date!: any;
  constructor(date: string) {
    this.date = date;
  }
  // value="2022-07-24"
  getDAteWithoutTime() {
    // let today = new Date();
    // today.toISOString().split('T')[0];
    var d = new Date(this.date);
    var NoTimeDate = d.toISOString().split('T')[0];
    return NoTimeDate;
  }
}
