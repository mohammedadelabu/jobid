import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileSetupService {
  editedCandidateIdMsg = new BehaviorSubject(null);
  constructor() {}

  setCandidateToSetUpProfileId(candidateId: string) {
    localStorage.setItem('CANDIDATE_TO_SETUP_PROFILE_ID', candidateId);
  }

  getCandidateToSetUpProfileId() {
    let candidateId;
    let data: any = localStorage.getItem('CANDIDATE_TO_SETUP_PROFILE_ID');
    if (data) {
      candidateId = data;
    }
    return candidateId;
  }

  removeCandidateToSetUpProfileId() {
    localStorage.removeItem('CANDIDATE_TO_SETUP_PROFILE_ID');
  }

  itemExist() {
    let data: any = localStorage.getItem('CANDIDATE_TO_SETUP_PROFILE_ID');
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
