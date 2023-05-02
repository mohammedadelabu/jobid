import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateSummaryService } from 'src/app/services/candidate-summary.service';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { ExperienceService } from 'src/app/services/experience.service';
import { LanguageSpokenService } from 'src/app/services/language-spoken.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ProjectService } from 'src/app/services/project.service';
import { RecruiterOpinionService } from 'src/app/services/recruiter-opinion.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-admin-resume-preview',
  templateUrl: './admin-resume-preview.component.html',
  styleUrls: ['./admin-resume-preview.component.scss'],
})
export class AdminResumePreviewComponent implements OnInit {
  candidateSkillList: any;
  languagesSpoken: any;
  candidateId: any;
  userInformation: any;
  workHistory: any;
  recruiterOpinion: any;
  infoMessage = 'No opinion provided yet!';
  profileList: any;
  candidateSummary: any;
  user: any;
  projectList: any;
  // undisclosed = false;
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
    private _router: Router
  ) {}

  ngOnInit(): void {
  }

  ngAfterContentChecked() {
    this.checkRoute();
  }
  onGetCandidateId() {
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
    this.onGetCandidateId();
    this.getCandidateSkill(this.candidateId);
    this.getLanguages(this.candidateId);
    this.getWorkExperience(this.candidateId);
    this.getPersonalProfile(this.candidateId);
    this.getCandidateSummary(this.candidateId);
    this.getProjects(this.candidateId);
  }

  getCandidateData() {
    this.onGetCandidateId();
    
    this.getRecruiterOpinion(this.candidateId);
  }

  getRecruiterOpinion(id: any) {
    this._recruiterOpinionSvc
      .getRecruiterOpinion(id)
      .subscribe((response: any) => {
        this.recruiterOpinion = response.Data;
        this.infoMessage = response.ResponseMessage;
      });
  }

  getCandidateSummary(candidateId: any) {
    this._candidateSummarySvc.getCandidateSummary(candidateId).subscribe({
      next: (response: any) => {
        this.candidateSummary = response.Data;
      },
      error: (err: any) => {
        console.warn(err);
      },
    });
  }

  getCandidateSkill(id: string) {
    this._skillSvc.getCandidateSkillSet(id).subscribe({
      next: (response: any) => {
        if (response) {
          this.candidateSkillList = response.Data;
        }
      },
      error: (err:any) => {
        console.warn(err);
      },
    });
  }

  getLanguages(id: string) {
    this._languageSvc.getLanguagesSpoken(id).subscribe({
      next: (response: any) => {
        if (response) {
          this.languagesSpoken = response.Data;
        }
      },
      error: (err) => {
        console.warn(err);
      },
    });
  }

  getWorkExperience(id: string) {
    this._experienceSvc.getCandidateWorkHistory(id).subscribe({
      next: (response: any) => {
        if (response) {
          this.workHistory = response.Data;
        }
      },
      error: (err) => {
        console.warn(err);
      },
    });
  }

  getPersonalProfile(candidateId: any) {
    this._profileSvc.getCandidateProfile(candidateId).subscribe(
      {
        next: (response: any) => {
          if (response.Data) {
            this.profileList = response.Data;
          }
        },
        error: (err) => {
          console.warn(err);
        },
      }
    );
  }

  getProjects(candidateId: any) {
    this._projectSvc.getCandidateProjects(candidateId).subscribe({
      next: (response: any) => {
        this.projectList = response.Data;
      },
      error: (err: any) => {
        console.warn(err);
      },
    });
  }

  
  /* print page */
  printResume() {
    const cvSaveBtn = document.querySelector('#cv-save-btn');
    const cvSaveBtn2 = document.querySelector('#undisclosed-cv-save-btn');
    cvSaveBtn?.classList.add('d-none');
    cvSaveBtn2?.classList.add('d-none');
    setTimeout(() => {
      cvSaveBtn?.classList.remove('d-none');
      cvSaveBtn2?.classList.remove('d-none');
    }, 2000);

    window.print();
  }

  printUndisclosed() {
    const cvSaveBtn = document.querySelector('#cv-save-btn');
    const cvSaveBtn2 = document.querySelector('#undisclosed-cv-save-btn');
    cvSaveBtn?.classList.add('d-none');
    cvSaveBtn2?.classList.add('d-none');
    setTimeout(() => {
      this.printResume();
      cvSaveBtn?.classList.remove('d-none');
      cvSaveBtn2?.classList.remove('d-none');
    }, 2000);
  }
}
