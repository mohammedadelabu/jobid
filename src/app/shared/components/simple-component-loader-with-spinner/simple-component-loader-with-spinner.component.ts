import { Component, Input, OnInit } from '@angular/core';
import { th } from 'date-fns/locale';

@Component({
  selector: 'app-simple-component-loader-with-spinner',
  templateUrl: './simple-component-loader-with-spinner.component.html',
  styleUrls: ['./simple-component-loader-with-spinner.component.scss'],
})
export class SimpleComponentLoaderWithSpinnerComponent implements OnInit {
  @Input() textStyle: any;
  @Input() loaderStyle: any;
  @Input() loaderText!: string;
  text = 'Loading...';
  textStyle_ = { color: 'rgba(79, 178, 120, 1)' };
  loaderStyle_: any = {
    border: '8px solid #f3f3f3',
    borderTop: '8px solid rgba(79, 178, 120, 1)',
  };
  constructor() {}

  ngOnInit(): void {
    if (this.textStyle) {
      this.textStyle_ = this.textStyle;
    }
    if (this.loaderStyle) {
      this.loaderStyle_ = this.loaderStyle;
    }

    if (this.loaderText) {
      this.text = this.loaderText;
    }
  }
}
