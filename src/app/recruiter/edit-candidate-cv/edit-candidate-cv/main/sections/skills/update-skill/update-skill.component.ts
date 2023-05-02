import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { SkillService } from 'src/app/services/skill.service';
import { Skill } from 'src/app/models/types/skill';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-skill',
  templateUrl: './update-skill.component.html',
  styleUrls: ['./update-skill.component.scss'],
})
export class UpdateSkillComponent implements OnInit, OnDestroy {
  skillId!: string;
  updateSkillsForm!: FormGroup;
  responseMsg: any;
  candidateSkillList: any;
  candidateId: any;
  categories: any;
  subscriptions: Subscription[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _skillSvc: SkillService,
    private _route: ActivatedRoute,
    private _editCandidateCvSvc: EditCandidateCvService,
    private _skillsSvc: SkillService
  ) {}
  ngOnInit(): void {
    this.onGetCandidateId();
    this.buildForm();
    this.getSkillParamId();
    this.getSKillsCategories();
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    // 
  }

  getSKillsCategories() {
    let subscription = this._skillsSvc.getSkillsCategories().subscribe({
      next: (response: any) => {
        this.categories = response?.Data;
      },
      error: (err: any) => {
        console.error(err);
      },
    });
    this.subscriptions.push(subscription);
  }

  getSkillParamId() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        this.skillId = params.get('id');
        this.onGetSkillSet();
      },
      error: (error) => {
        console.error('There was an error!', error);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetSkillSet() {
    let subscription = this._skillSvc
      .getCandidateSkillSet(this.candidateId)
      .subscribe((response: any) => {
        if (response) {
          this.candidateSkillList = response;
          let Skill = this.candidateSkillList?.filter((element: any) => {
            // return element.Id === 'f6e16a69-015d-408b-cb6f-08d9c46030ea';
            return element.Id === this.skillId;
          });
          this.skillId = Skill[0].Id;
          this.updateSkillsForm.controls['SkillCategoryId'].setValue(
            Skill[0].CategoryId
          );
          this.updateSkillsForm.controls['Skills'].setValue(Skill[0].Skills);
        }
      });
    this.subscriptions.push(subscription);
  }

  updateSkills() {
    this.getSkillParamId();
    const data: Skill = {
      SkillCategoryId: this.updateSkillsForm.value.SkillCategoryId,
      Skills: this.updateSkillsForm.value.Skills,
      UpdatedBy: '',
    };
    

    let subscription = this._skillSvc
      .updateSkill(this.skillId, data)
      .subscribe((response: any) => {
        if (response) {
          
          this.responseMsg = response.ResponseMessage;
          setTimeout(() => {
            this._router.navigate(['/edit-candidate-cv/skills']);
          }, 2000);
        }
      });
    this.subscriptions.push(subscription);
  }
  buildForm() {
    this.updateSkillsForm = this._formBuilder.group({
      SkillCategoryId: '',
      Skills: '',
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
