import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CandidateSummaryService } from 'src/app/services/candidate-summary.service';
import { CertificationService } from 'src/app/services/certification.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { EducationService } from 'src/app/services/education.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { IdentityService } from 'src/app/services/identity.service';
import { LanguageSpokenService } from 'src/app/services/language-spoken.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ProjectService } from 'src/app/services/project.service';
import { RecruiterOpinionService } from 'src/app/services/recruiter-opinion.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-admin-cv-template',
  templateUrl: './admin-cv-template.component.html',
  styleUrls: ['./admin-cv-template.component.scss'],
})
export class AdminCvTemplateComponent implements OnInit, OnDestroy {
  // @Input('undisclosed') undisclosed!: boolean;
  @Input('isUndisclosed') isUndisclosed!: boolean;
  @Input('wsWordFormat') wsWordFormat!: boolean;
  // wsWordFormat:boolean = true;
  candidateSkillList: any;
  languagesSpoken: any;
  candidateId: any;
  userInformation: any;
  workHistory: any;
  recruiterOpinion: any;
  infoMessage = 'No opinion provided yet!';
  candidateSummary: any;
  user: any;
  projectList: any;
  candidateProfile: any;
  candidateProfileUserInfo: any;
  educationList: any;
  certificationList: any;
  candidateInformation: any;
  subscriptions: Subscription[] = [];

  constructor(
    private _skillSvc: SkillService,
    private _languageSvc: LanguageSpokenService,
    // private _userSvc: UserService,
    private _editCandidateCvSvc: EditCandidateCvService,
    private _experienceSvc: ExperienceService,
    // private _authSvc: AuthenticationService,
    private _recruiterOpinionSvc: RecruiterOpinionService,
    private _profileSvc: ProfileService,
    private _candidateSummarySvc: CandidateSummaryService,
    private _projectSvc: ProjectService,
    private _educationSvc: EducationService,
    private _certificationSvc: CertificationService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _identitySvc: IdentityService
  ) {}

  ngOnInit(): void {
    this.getParams();
    this.getUserData();
    this.getCandidateData();
  }

  ngAfterContentChecked() {
    this.checkRoute();
  }

  getParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        
        let candidateId = params.get('candidateId');
        if (candidateId) {
          localStorage.setItem('CANDIDATE_TO_EDIT_CV_ID', candidateId);
        } else {
          return;
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetCandidateId() {
    this.getParams();
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    
  }

  checkRoute() {
    const cvSaveBtn = document.querySelector('#cv-save-btn');
    /* check url with this._router.url */
    if (this._router.url != '/admin-view-cv') {
      /* hide download button if url is not '/view-cv' */
      cvSaveBtn?.classList.add('d-none');
    }
  }

  getUserData() {
    // this.user = this._userSvc.getUserData();
    // console.log("this.user: ", this.user);
    // console.log(user.FirstName, user.LastName);

    this.onGetCandidateId();

    // 
    this.getCandidateSkill(this.candidateId);
    this.getLanguages(this.candidateId);
    this.getWorkExperience(this.candidateId);
    // this.getUserInformation(this.candidateId);
    this.getPersonalProfile(this.candidateId);
    this.getCandidateSummary(this.candidateId);
    this.getProjects(this.candidateId);
    this.getEducation(this.candidateId);
    this.getCertifications(this.candidateId);
    this.onGetCandidateInformation(this.candidateId);
  }

  getCandidateData() {
    this.onGetCandidateId();
    
    this.getRecruiterOpinion(this.candidateId);
  }

  onGetCandidateInformation(CandidateId: string) {
    let subscription = this._identitySvc.getUserById(CandidateId).subscribe({
      next: (response: any) => {
        this.candidateInformation = response;
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  getRecruiterOpinion(id: any) {
    let subscription = this._recruiterOpinionSvc
      .getRecruiterOpinion(id)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.recruiterOpinion = response;
            this.infoMessage = response.ResponseMessage;
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  getCandidateSummary(candidateId: any) {
    let subscription = this._candidateSummarySvc
      .getCandidateSummary(candidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.candidateSummary = response;
          }
        },
        error: (err: any) => {
          console.warn(err);
        },
      });
    this.subscriptions.push(subscription);
  }

  getCandidateSkill(id: string) {
    let subscription = this._skillSvc.getCandidateSkillSet(id).subscribe({
      next: (response: any) => {
        if (response) {
          this.candidateSkillList = response;
        }
      },
      error: (err: any) => {
        console.warn(err);
      },
    });
    this.subscriptions.push(subscription);
  }

  getLanguages(id: string) {
    let subscription = this._languageSvc.getLanguagesSpoken(id).subscribe({
      next: (response: any) => {
        if (response) {
          this.languagesSpoken = response;
        }
      },
      error: (err) => {
        console.warn(err);
      },
    });
    this.subscriptions.push(subscription);
  }

//   {
//     "Id": "405febc5-ed0e-4af1-794e-08daf53a1d98",
//     "UserId": "02382455-b315-4c49-a6d0-240671b4df101",
//     "User": null,
//     "Language": "English",
//     "Proficiency": "expert",
//     "UpdatedBy": null,
//     "LastUpdate": "0001-01-01T00:00:00"
// }

  getWorkExperience(id: string) {
    let subscription = this._experienceSvc
      .getCandidateWorkHistory(id)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.workHistory = response;
          }
        },
        error: (err: any) => {
          console.warn(err);
        },
      });
    this.subscriptions.push(subscription);
  }

  getPersonalProfile(candidateId: any) {
    let subscription = this._profileSvc
      .getCandidateProfile(candidateId)
      .subscribe(
        {
          next: (response: any) => {
            if (response) {
              this.candidateProfile = response;
              this.candidateProfileUserInfo = this.candidateProfile.User;
            }
          },
          error: (err) => {
            console.warn(err);
          },
        }
      );

    this.subscriptions.push(subscription);
  }

  getProjects(candidateId: any) {
    let subscription = this._projectSvc
      .getCandidateProjects(candidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.projectList = response;
          }
        },
        error: (err: any) => {
          console.warn(err);
        },
      });
    this.subscriptions.push(subscription);
  }

  getEducation(candidateId: any) {
    let subscription = this._educationSvc
      .getCandidateEducation(candidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.educationList = response;
          }
        },
        error: (err: any) => {
          console.warn(err);
        },
      });
    this.subscriptions.push(subscription);
  }

  getCertifications(candidateId: any) {
    let subscription = this._certificationSvc
      .getCandidateCertification(candidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.certificationList = response;
          }
        },
        error: (err: any) => {
          console.warn('Error: ', err);
        },
      });
    this.subscriptions.push(subscription);
  }

  /* print page */
  printResume() {
    const cvSaveBtn = document.querySelector('#cv-save-btn');
    cvSaveBtn?.classList.add('d-none');
    setTimeout(() => {
      cvSaveBtn?.classList.remove('d-none');
    }, 2000);

    window.print();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
