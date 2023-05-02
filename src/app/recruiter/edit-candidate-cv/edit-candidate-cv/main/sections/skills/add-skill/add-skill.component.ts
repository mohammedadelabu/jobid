import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Skill, SkillCategory } from 'src/app/models/types/skill';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss'],
})
export class AddSkillComponent implements OnInit, OnDestroy {
  skillsForm!: FormGroup;
  responseMsg: any;
  candidateId: any;
  //
  skillsetForm!: FormGroup;
  skillsetFormAlt!: FormGroup;
  isAvailable: boolean = true;
  categories: any;
  errorMsg: any;
  subscriptions: Subscription[] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _skillSvc: SkillService,
    private _editedCandidateCvSvc: EditCandidateCvService
  ) {}
  ngOnInit(): void {
    this.buildForm();
    this.getSKillsCategories();
    this.onGetCandidateId();
  }

  onGetCandidateId() {
    this.candidateId = this._editedCandidateCvSvc.getCandidateToEditCvId();
    
  }

  handleIsAvailable() {
    this.isAvailable = !this.isAvailable;
  }

  getSKillsCategories() {
    let subscription = this._skillSvc.getSkillsCategories().subscribe({
      next: (response: any) => {
        
        this.categories = response.Data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    this.subscriptions.push(subscription);
  }

  buildForm() {
    this.skillsForm = this._formBuilder.group({
      Language: '',
      Framework: '',
      Database: '',
      Architecture: '',
      CloudPlatform: '',
      VersionControl: '',
      Others: '',
    });

    this.skillsetForm = this._formBuilder.group({
      // CategoryName: '',
      Skills: '',
      SkillCategoryId: null,
    });

    this.skillsetFormAlt = this._formBuilder.group({
      CategoryName: '',
      Skills: '',
    });
  }

  createNewCategory() {
    console.log(this.skillsetFormAlt.controls['CategoryName'].value);
    const newCategory: SkillCategory = {
      CategoryName: this.skillsetFormAlt.controls['CategoryName'].value,
      UpdatedBy: '',
    };
    console.log('Skill category: ', newCategory);
    let subscription = this._skillSvc.addSkillsCategory(newCategory).subscribe({
      next: (response: any) => {
        console.log('Add newCategory response: ', response);
        if (response) {
          const categoryNameItem = response.Data;

          this._skillSvc.getSkillsCategories().subscribe({
            next: (response: any) => {
              
              this.categories = response.Data;
              // let x = this.categories.filter(
              //   (cat: any) => cat.CategoryName == newCategory.CategoryName
              // );
              // 
              // const time = new Date().getTime().toString().slice(0, 5);
              // const newId = parseInt(time);
              const newData: Skill = {
                SkillCategoryId: categoryNameItem.CategoryId,
                Skills: this.skillsetFormAlt.controls['Skills'].value,
                UpdatedBy: '',
              };

              

              this._skillSvc.addSkill(this.candidateId, newData).subscribe({
                next: (response: any) => {
                  if (response) {
                    
                    this.responseMsg = response.Mgs;
                    setTimeout(() => {
                      this._router.navigate(['/edit-candidate-cv/skills']);
                      this.responseMsg = '';
                    }, 2000);
                  }
                },
                error: (err: any) => {
                  console.warn(err);
                },
              });
            },
            error: (err: any) => {
              console.log(err);
            },
          });

          // this._skillSvc
          //   .addSkills(this.candidateId, this.skillsetFormAlt.value)
          //   .subscribe({
          //     next: (response: any) => {
          //       
          //     },
          //     error: (err: any) => {
          //       console.warn(err);
          //     },
          //   });
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn(err);
          this.errorMsg = err.error.Msg;
        }
      },
    });
    this.subscriptions.push(subscription);
  }

  /* CHECK IF SKILL CATEGORY EXISTS */
  onCheckCategoryExist(categoryId: any) {}

  addSkills() {
    console.log(this.skillsetForm.value);
    // let data: any = localStorage.getItem('currentUserData');
    // let userData = JSON.parse(data);
    let subscription = this._skillSvc
      .addSkill(this.candidateId, this.skillsetForm.value)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.responseMsg = response.Mgs;
            setTimeout(() => {
              this._router.navigate(['/edit-candidate-cv/skills']);
              this.responseMsg = '';
            }, 2000);
          }
        },
        error: (err: any) => {
          console.warn(err);
        },
      });
    this.subscriptions.push(subscription);
  }

  addSkillsAlt() {
    console.log(this.skillsetFormAlt.value);
    this.createNewCategory();
  }

  //
  saveData() {
    // this._editedCandidateCvSvc.getEditedCandidateIdMsg().subscribe((response) => {
    //   console.log('candidate: ', response);
    //   if (response == null) {
    //     this._router.navigate(['/administrator/candidates/']);
    //   } else {
    //     this.candidateId = response;
    //     console.log('candidate id to be edited: ', this.candidateId);
    //     console.log(this.skillsForm);
    //     this._skillSvc
    //       .addSkill(this.skillsForm.value, this.candidateId)
    //       .subscribe((response: any) => {
    //         if (response) {
    //           
    //           this.responseMsg = response.Mgs;
    //           console.log('Education added!', response);
    //           setTimeout(() => {
    //             this.skillsForm.reset();
    //             this._router.navigate([
    //               '/administrator/edit-candidate-data/skills',
    //             ]);
    //           }, 2500);
    //         }
    //       });
    //   }
    // });

    
    let subscription = this._skillSvc
      .addSkill(this.skillsForm.value, this.candidateId)
      .subscribe((response: any) => {
        if (response) {
          
          this.responseMsg = response.Mgs;
          console.log('Education added!', response);
          setTimeout(() => {
            this.skillsForm.reset();
            this._router.navigate([
              '/administrator/edit-candidate-data/skills',
            ]);
          }, 2500);
        }
      });
    this.subscriptions.push(subscription);

    // console.log(this.skillsForm.value);
    // let data: any = localStorage.getItem('currentUserData');
    // let userData = JSON.parse(data);
    // this._skillSvc
    //   .addSkill(this.skillsForm.value, userData.Id)
    //   .subscribe((response: any) => {
    //     if (response) {
    //       
    //       this.responseMsg = response.Mgs;
    //       setTimeout(() => {
    //         this._router.navigate(['/administrator/edit-candidate-data/skills/']);
    //       }, 2500);
    //     }
    //   });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
