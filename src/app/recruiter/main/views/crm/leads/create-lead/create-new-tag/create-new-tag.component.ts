import { NgRedux } from '@angular-redux/store';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LeadTagService } from 'src/app/services/lead-tag.service';
import { IAppState } from 'src/STORE/store';
import { ADD_LEAD_TAG, ADD_LEAD_TAG_ERROR, ADD_LEAD_TAG_SUCCESS } from 'src/STORE/_leadTag.store/leadTag.actions';

@Component({
  selector: 'app-create-new-tag',
  templateUrl: './create-new-tag.component.html',
  styleUrls: ['./create-new-tag.component.scss']
})
export class CreateNewTagComponent implements OnInit {
  tag: any;
  addNewTag: boolean = false;
  @Output() ToggleaddNewTagForm = new EventEmitter();
  isSending: boolean = false;

  constructor(private _leadTagSvc: LeadTagService,
    private toastr: ToastrService,
    private ngRedux: NgRedux<IAppState>) { }

  ngOnInit(): void {
  }



  toggleaddNewTag() {
    this.ToggleaddNewTagForm.emit(true)
    // this.addNewTag = !this.addNewTag;
  }



  onAddNewTag() {
    const Payload = {
      Name: this.tag,
    };
    if (!Payload?.Name) {
      return;
    }
    this.isSending = true;
    this.ngRedux.dispatch({ type: ADD_LEAD_TAG })
    this._leadTagSvc.AddLeadTag(Payload).subscribe({
      next: (response: any) => {
        if (response) {
          this.isSending = false;
          this.tag = null;
          this.toastr.success("Tag successfully added!");
          this.ngRedux.dispatch({ type: ADD_LEAD_TAG_SUCCESS, payload: Payload })
          this.toggleaddNewTag();
        }
      },
      error: (err: any) => {
        if (err) {
          this.isSending = false;
          this.toastr.error("Adding Tag failed!");
          this.ngRedux.dispatch({ type: ADD_LEAD_TAG_ERROR, payload: err })
        }
      },
    });
  }
}
