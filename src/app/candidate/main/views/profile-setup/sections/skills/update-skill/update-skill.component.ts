import {
  Component,
  EventEmitter,
  Inject,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Skill } from 'src/app/models/types/skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-update-skill',
  templateUrl: './update-skill.component.html',
  styleUrls: ['./update-skill.component.scss'],
})
export class UpdateSkillComponent implements OnInit, OnDestroy {
  @Output() closeIsUpdateSkill = new EventEmitter();
  skillId!: string;
  updateSkillsForm!: FormGroup;
  responseMsg: any;
  candidateSkillList: any;
  candidateId: any;
  categories: any;
  Subscriptions: Subscription[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _skillSvc: SkillService,
    private _skillsSvc: SkillService,
    public dialogRef: MatDialogRef<UpdateSkillComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { skillId: string; candidateId: string }
  ) {}
  ngOnInit(): void {
    this.buildForm();
    this.getSKillsCategories();
  }

  ngAfterViewInit() {
    this.getSKillsCategories();
    //
    this.skillId = this.data?.skillId;
    this.candidateId = this.data?.candidateId;
    // this.getExperienceData(this.candidateId, this.skillId);
    this.onGetCandidateSkillSet(this.candidateId);
  }
  getSKillsCategories() {
    let subscription = this._skillsSvc.getSkillsCategories().subscribe({
      next: (response: any) => {
        this.categories = response.Data;
      },
      error: (err: any) => {
        // console.log(err);
      },
    });
    this.Subscriptions.push(subscription);
  }

  onGetCandidateSkillSet(CandidateId: string) {
    let subscription = this._skillSvc
      .getCandidateSkillSet(CandidateId)
      .subscribe((response: any) => {
        if (response) {
          this.candidateSkillList = response.Data;
          let Skill = this.candidateSkillList.filter((element: any) => {
            // return element.Id === 'f6e16a69-015d-408b-cb6f-08d9c46030ea';
            return element.Id === this.skillId;
          });
          this.skillId = Skill[0]?.Id;
          this.updateSkillsForm.controls['SkillCategoryId'].setValue(
            Skill[0]?.CategoryId
          );
          this.updateSkillsForm.controls['Skills'].setValue(Skill[0].Skills);
        }
      });
    this.Subscriptions.push(subscription);
  }

  updateSkills() {
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
            this.dialogRef.close('close');
            this.closeIsUpdateSkill.emit(false);
          }, 3000);
        }
      });
    this.Subscriptions.push(subscription);
  }
  buildForm() {
    this.updateSkillsForm = this._formBuilder.group({
      SkillCategoryId: '',
      Skills: '',
    });
  }

  onCloseForm() {
    this.dialogRef.close('close');
    //
    // this.closeIsUpdateSkill.emit(false);
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
