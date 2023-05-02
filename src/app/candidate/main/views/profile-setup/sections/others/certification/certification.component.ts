import { Component, OnInit } from '@angular/core';
import { IdentityService } from 'src/app/services/identity.service';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss'],
})
export class CertificationComponent implements OnInit {
  isAddCertification!: boolean;
  isUpdateCertification!: boolean;
  candidateId: any;
  constructor(private _indentitySvc: IdentityService) {}

  ngOnInit(): void {
    this.onGetLoggedInUserId();}

  onCloseIsAddCertification() {
    this.isAddCertification = false;
  }

  onCloseIsUpdateCertification() {
    this.isUpdateCertification = false;
  }

  onGetLoggedInUserId() {
    this.candidateId = this._indentitySvc.getLoggedInUserId();
  }
  goBack() {
    history.back();
  }
}
