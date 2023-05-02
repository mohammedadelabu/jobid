import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditCandidateCvService } from 'src/app/services/edit-candidate-cv.service';

@Component({
  selector: 'app-candidate-cv-preview',
  templateUrl: './candidate-cv-preview.component.html',
  styleUrls: ['./candidate-cv-preview.component.scss'],
})
export class CandidateCvPreviewComponent implements OnInit, OnDestroy {
  candidateId: any;
  subscriptions: Subscription[] = [];
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _editCandidateCvSvc: EditCandidateCvService
  ) {}
  ngOnInit(): void {
    this.onGetParams();
  }

  onGetParams() {
    let subscription = this._route.paramMap.subscribe({
      next: (params: any) => {
        
        this.candidateId = params.get('candidateId');
        console.log(this.candidateId);
      },
      error: (err: any) => {
        
      },
    });
    this.subscriptions.push(subscription);
  }
  onEditCV() {
    this._editCandidateCvSvc.setCandidateToEditCvId(this.candidateId);
    this._router.navigate(['/edit-candidate-cv/personal-profile/']);
  }

  back() {
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
