import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-document-dialog',
  templateUrl: './view-document-dialog.component.html',
  styleUrls: ['./view-document-dialog.component.scss']
})
export class ViewDocumentDialogComponent implements OnInit {
  uploadedCV!: string;
  doc!:string;

  constructor(    @Inject(MAT_DIALOG_DATA) public data: { CV_URL: string},
    public dialogRef: MatDialogRef<ViewDocumentDialogComponent>) { }

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
