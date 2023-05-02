import { Component, OnInit } from '@angular/core';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-preview-education',
  templateUrl: './preview-education.component.html',
  styleUrls: ['./preview-education.component.scss'],
})
export class PreviewEducationComponent implements OnInit {
  candidateId: any;
  candidateEducationList: any;

  constructor(private _educationSvc: EducationService,
    private _editCandidateCvSvc: EditCandidateCvService) {}

  ngOnInit(): void {
    this.onGetCandidateId();
    this.getData();
  }

  onGetCandidateId() {
    this.candidateId = this._editCandidateCvSvc.getCandidateToEditCvId();
    
  }

  getData() {    
    this._educationSvc.getCandidateEducation(this.candidateId).subscribe({
      next: (response: any) => {
        if (response) {
          this.candidateEducationList = response;
        }
      },
      error: (err) => {
        console.warn(err);
      },
    });
  }

  removeEducation(experienceId: any) {
    let confirmDelete = confirm(
      'Are you sure you want to delete this education?'
    );
    if (confirmDelete) {
      this._educationSvc.removeEducation(experienceId).subscribe({
        next: (response: any) => {          
          if(response){
            this.getData();
          }
        },
        error: (err:any) => {
          console.warn(err);
        },
      });
    }
  }

  
  onGoBack(){
    history.back()
  }
}
