import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-uploaded-cv',
  templateUrl: './preview-uploaded-cv.component.html',
  styleUrls: ['./preview-uploaded-cv.component.scss']
})
export class PreviewUploadedCvComponent implements OnInit {
  uploadedCV!: string;
  doc!:string;
  // doc = 'https://zartstore.blob.core.windows.net/zartstore/Adepoju%20Oluwasegun%20(Resume).pdf';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { CV_URL: string},
    public dialogRef: MatDialogRef<PreviewUploadedCvComponent>) { }

  ngOnInit(): void {
    console.log("cv_url: ", this.data.CV_URL);
    this.uploadedCV = this.data.CV_URL;
    this.doc= this.uploadedCV;
    console.log(this.doc);
  }

  
 
  /* CLOSE DIALOG BOX */
  onNoClick(): void {
    this.dialogRef.close();
  }

}
