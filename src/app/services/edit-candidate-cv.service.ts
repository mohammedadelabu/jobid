import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditCandidateCvService {
  editedCandidateIdMsg = new BehaviorSubject(null);
  constructor() {}

  setCandidateToEditCvId(candidateId: string) {
    localStorage.setItem('CANDIDATE_TO_EDIT_CV_ID', candidateId);
  }

  getCandidateToEditCvId() {
    let candidateId;
    let data: any = localStorage.getItem('CANDIDATE_TO_EDIT_CV_ID');
    if (data) {
      candidateId = data;
    }
    return candidateId;
  }

  removeCandidateToEditCvId() {
    localStorage.removeItem('CANDIDATE_TO_EDIT_CV_ID');
  }

  itemExist() {
    let data: any = localStorage.getItem('CANDIDATE_TO_EDIT_CV_ID');
    if (data) {
      return true;
    }
    return false;
  }


  
  sendEditedCandidateIdMsg(msg: any) {
    return this.editedCandidateIdMsg.next(msg);
  }

  getEditedCandidateIdMsg() {
    return this.editedCandidateIdMsg.asObservable();
  }

  keepCandidateInformation(candidate: any) {
    localStorage.setItem('candidate_profile', JSON.stringify(candidate));
  }

}
