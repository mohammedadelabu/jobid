import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-preview-skill',
  templateUrl: './preview-skill.component.html',
  styleUrls: ['./preview-skill.component.scss'],
})
export class PreviewSkillComponent implements OnInit, OnDestroy {
  candidateId: any;
  candidateSkillList: any;
  subscriptions: Subscription[] = [];

  constructor(
    private _editCandidateCvSvc: EditCandidateCvService,
    private _skillSvc: SkillService
  ) {}

  ngOnInit(): void {
    this.onGetCandidateId();
    this.getData();
  }
  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    // 
  }

  getData() {
    let subscription = this._skillSvc
      .getCandidateSkillSet(this.candidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.candidateSkillList = response;
            this.candidateSkillList.forEach((element: any) => {
              if (element.Skills === '') {
                this.removeSkill(element.Id);
              }
            });
          }
        },
        error: (err: any) => {
          
        },
      });
    this.subscriptions.push(subscription);
  }

  removeSkill(skillId: any) {
    // console.log(skillId);
    let confirmDelete = confirm('Are you sure you want to delete this Skill?');
    if (confirmDelete) {
      let subscription = this._skillSvc
        .removeSkill(skillId)
        .subscribe((response: any) => {
          
          this.getData();
        });
      this.subscriptions.push(subscription);
    }
  }

  removeSkillItem(item: any, skill: any) {
    let array = skill?.Skills.split(',');
    let x = array.filter((u: any) => {
      return u != item;
    });
    this.updateSkill(skill.Id, x.toString(), skill?.CategoryId);
  }

  updateSkill(SkillId: any, Skills: any, CategoryId: any) {
    let data = {
      SkillCategoryId: CategoryId,
      Skills: Skills,
      UpdatedBy: '',
    };
    
    let subscription = this._skillSvc.updateSkill(SkillId, data).subscribe({
      next: (response: any) => {
        // 
        if (response) {
          this.getData();
        }
      },
      error: (err: any) => {
        
      },
    });
    this.subscriptions.push(subscription);
  }

  onGoBack() {
    history.back();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
