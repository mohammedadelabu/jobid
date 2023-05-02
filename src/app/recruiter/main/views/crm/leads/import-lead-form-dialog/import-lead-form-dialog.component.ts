import { NgRedux, select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CertificationService } from 'src/app/services/certification.service';
import { LeadService } from 'src/app/services/lead.service';
import { IAppState } from 'src/STORE/store';
import {
  IMPORT_LEAD_FILE,
  IMPORT_LEAD_FILE_ERROR,
  IMPORT_LEAD_FILE_SUCCESS,
} from 'src/STORE/_lead.store/lead.actions';

@Component({
  selector: 'app-import-lead-form-dialog',
  templateUrl: './import-lead-form-dialog.component.html',
  styleUrls: ['./import-lead-form-dialog.component.scss'],
})
export class ImportLeadFormDialogComponent implements OnInit, OnDestroy {
  @select((s) => s.leads.importLeadFileRespondMsg)
  importLeadFileRespondMsg$: any;
  @select((s) => s.leads.isLoading) isLoading$: any;
  rawFile: any;
  label: any = 'Upload lead file (CSV or Excel)';
  isFile = false;
  subscriptions: Subscription[] = [];
  LeadFile: any;
  successMessage: any;
  isSending: boolean = false;
  btnLabel: string = "Import";
  fileTypeErrorMsg!: string;

  constructor(
    public dialogRef: MatDialogRef<ImportLeadFormDialogComponent>,
    private ngRedux: NgRedux<IAppState>,
    private _leadSvc: LeadService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void { }

  onSelectFile($event: any) {
    if ($event.target.files) {
      this.rawFile = $event.target.files[0];
      console.log('this.rawFile***: ', this.rawFile);
      var allowedExtensions = /(\.xlsx)$/i;
      if (!allowedExtensions.exec(this.rawFile?.name)) {
        // alert('Please upload file having extensions .xlsx only.');
        this.fileTypeErrorMsg = "Please upload file having extensions .xlsx only."

        this.rawFile = null;
        return false;
      } else {
        this.label = this.rawFile.name;
        const formData = new FormData();

        // Store form name as "file" with file data
        formData.append('file', this.rawFile, this.rawFile?.name);


        // this.uploadLeadFile(formData);
        this.LeadFile = formData;
        return this.LeadFile
      }
    }
  }


  uploadLeadFile() {
    if (this.LeadFile) {
      this.isSending = true;
      this.btnLabel = "Uploading..."
      this.ngRedux.dispatch({ type: IMPORT_LEAD_FILE });
      let subscription = this._leadSvc.importLeadFile(this.LeadFile).subscribe({
        next: (response: any) => {
          if (response) {
            this.ngRedux.dispatch({
              type: IMPORT_LEAD_FILE_SUCCESS,
              payload: response,
            });
            let responseMessage = 'Lead file successfully uploaded!';
            this.toastr.success(responseMessage);
            this.label = null;
            // this._leadSvc.LoadLeadsList();
            this.rawFile = null;
            this.isSending = false;
            this.btnLabel = "Import";
            this.closeDialog();
          }
        },
        error: (err: any) => {
          if (err) {
            this.isSending = false;
            this.btnLabel = "Import"
            console.warn('Eror: ', err);
            this.toastr.error("Import lead file failed, try again!")
            this.ngRedux.dispatch({
              type: IMPORT_LEAD_FILE_ERROR,
              payload: err,
            });
          }
        },
      });
      this.subscriptions.push(subscription);
    }
  }

  closeDialog() {
    this.dialogRef.close('file upload widget closed!!!');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
