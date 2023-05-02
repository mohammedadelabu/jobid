import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { SkillService } from 'src/app/services/skill.service';
import { UpdateSkillComponent } from '../update-skill/update-skill.component';

@Component({
  selector: 'app-preview-skill',
  templateUrl: './preview-skill.component.html',
  styleUrls: ['./preview-skill.component.scss'],
})
export class PreviewSkillComponent implements OnInit, OnDestroy {
  @Input('candidateId') candidateId!: string;
  candidateSkillList: any;
  Subscriptions: Subscription[] = [];

  constructor(private _skillSvc: SkillService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    let subscription = this._skillSvc
      .getCandidateSkillSet(this.candidateId)
      .subscribe({
        next: (response: any) => {
          if (response) {
            // console.log('skills: ', response);
          }
          if (response.ResponseCode == '200') {
            this.candidateSkillList = response?.Data;
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
    this.Subscriptions.push(subscription);
  }

  updateSkill(skillId: string, candidateId: string) {
    const dialogRef = this.dialog.open(UpdateSkillComponent, {
      width: '100%',
      maxHeight: '95vh',
      data: { skillId: skillId, candidateId: candidateId },
    });

    let subscription = dialogRef.afterClosed().subscribe((result) => {

      if (result) {
        this.getData();
      }
    });
    this.Subscriptions.push(subscription);
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
      this.Subscriptions.push(subscription);
    }
  }

  removeSkillItem(item: any, skill: any) {
    let array = skill?.Skills.split(',');
    let x = array.filter((u: any) => {
      return u != item;
    });
    this.updateSkillItem(skill.Id, x.toString(), skill?.CategoryId);
  }

  updateSkillItem(SkillId: any, Skills: any, CategoryId: any) {
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
    this.Subscriptions.push(subscription);
  }

  onGoBack() {
    history.back();
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
