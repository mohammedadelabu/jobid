import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, retry, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Certification } from '../models/types/certification';

@Injectable({
  providedIn: 'root',
})
export class CertificationService {
  CertificationUrl = environment.baseUrl + 'api/Certification/';
  UploadDocumentUrl = this.CertificationUrl + 'UploadDocuments';

  editBehaviouralMsg = new BehaviorSubject(false);
  addBehaviouralMsg = new BehaviorSubject(false);
  certificationSubjectItem = new Subject();

  constructor(private _http: HttpClient) {}

  sendEditBehaviouralMsg(msg: any) {
    return this.editBehaviouralMsg.next(msg);
  }
  getEditBehaviouralMsg() {
    return this.editBehaviouralMsg.asObservable();
  }
  sendAddBehaviouralMsg(msg: any) {
    return this.addBehaviouralMsg.next(msg);
  }
  getAddBehaviouralMsg() {
    return this.addBehaviouralMsg.asObservable();
  }

  getCandidateCertification(userId: string) {
    // return this._http.get(`${this.CertificationUrl}GetCertification/${userId}`);
    return this._http
      .get(`${this.CertificationUrl}GetCertication/${userId}`)
      .pipe(
        retry(4),
        map((response: any) => {
          if (response) {
            const Body = response?.Data;
            return Body;
          }
        })
      ); /* typographical error GetCertication** */
  }

  addCertification(certification: Certification, userId: string) {
    return this._http.post(
      `${this.CertificationUrl}AddCertification/${userId}`,
      certification
    );
  }

  updateCertification(data: Certification, id: string) {
    console.log('certifiction serveice value received!: ', data, id);
    return this._http.put(
      `${this.CertificationUrl}UpdateCertificate/${id}`,
      data
    );
  }

  removeCertification(id: string) {
    return this._http.delete(
      `${this.CertificationUrl}RemoveCertification/${id}`
    );
  }

  sendCertificationSubjectItem(item: any) {
    return this.certificationSubjectItem.next(item);
  }
  getCertificationSubjectItem() {
    return this.certificationSubjectItem.asObservable();
  }

  uploadCertificationFile(formData: any) {
    return this._http.post(`${this.UploadDocumentUrl}`, formData);
  }
}
