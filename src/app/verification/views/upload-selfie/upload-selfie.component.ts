import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-selfie',
  templateUrl: './upload-selfie.component.html',
  styleUrls: ['./upload-selfie.component.scss'],
})
export class UploadSelfieComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  onSubmit(UploadSelfieForm: any) {
    console.log('UploadSelfieForm: ', UploadSelfieForm.value);
  }
}
