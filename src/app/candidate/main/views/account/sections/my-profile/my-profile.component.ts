import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EducationService } from 'src/app/services/education.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { IdentityService } from 'src/app/services/identity.service';
import { ProfileSetupService } from 'src/app/services/profile-setup.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  candidateId: any;
  candidateEmail: any;
  userInformation: any;
  userProfile: any;
  workExperience: any;
  skills: any;
  education: any;
  constructor(
    private _route: ActivatedRoute,
    private _identitySvc: IdentityService,
    private _profileSvc: ProfileService,
    private _experienceSvc: ExperienceService,
    private _educationSvc: EducationService,
    private _skillSvc: SkillService,
    private _router: Router,
    private _profileSetupSvc: ProfileSetupService
  ) {}

  ngOnInit(): void {
    this.getUrlParams();
  }

  // ngAfterViewChecked() {
  // console.log('skills ngOnInit(): ', this.skills);
  // if (this.skills) {
  //   this.skillsList = this.skills?.Data;
  // }
  // }
  // ngAfterViewInit(){

  // }
  getUrlParams() {
    this._route.paramMap.subscribe({
      next: (params: any) => {
        if (params) {
          this.candidateId = params.get('candidateId');
          this.candidateEmail = params.get('candidateEmail');
          this.getUserInformation(this.candidateId);
          this.getUserProfile(this.candidateId);
          this.getCandidateExperience(this.candidateId);
          this.getCandidateEducation(this.candidateId);
          this.getCandidateESkills(this.candidateId);
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn('Error: ', err);
        }
      },
    });
  }

  getUserInformation(userId: string) {
    this._identitySvc.getUserById(userId).subscribe({
      next: (response: any) => {
        if (response) {
          this.userInformation = response;
        }
      },
    });
  }

  getUserProfile(userId: string) {
    this._profileSvc.getCandidateProfile(userId).subscribe({
      next: (response: any) => {
        if (response) {
          this.userProfile = response?.Data[0];
        }
      },
    });
  }

  getCandidateExperience(CandidateId: string) {
    this._experienceSvc.getCandidateWorkHistory(CandidateId).subscribe({
      next: (response: any) => {        
        this.workExperience = response;      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
  }
  getCandidateEducation(CandidateId: string) {
    this._educationSvc.getCandidateEducation(CandidateId).subscribe({
      next: (response: any) => {        
        this.education = response;
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
  }
  getCandidateESkills(CandidateId: string) {
    this._skillSvc.getCandidateSkillSet(CandidateId).subscribe({
      next: (response: any) => {
        this.skills = response;
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
  }

  onUpdateProfile(CandidateId: string) {    
    this._profileSetupSvc.setCandidateToSetUpProfileId(CandidateId);
    this._router.navigate(['/candidate/profile-setup/personal-profile']);
  }
}
