import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyService } from 'src/app/services/company.service';
import { GlobalSearchService } from 'src/app/services/global-search.service';
import { IdentityService } from 'src/app/services/identity.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit, OnDestroy {
  @select((s) => s.candidates.candidatesList) candidatesList$: any;
  @select((s) => s.candidates.isLoading) isCandidatesListLoading$: any;
  @select((s) => s.company.companyList) companyList$: any;
  @select((s) => s.company.isLoading) isCompanyListLoading$: any;
  @select((s) => s.skillsList.candidatesListBySkills)
  candidatesListBySkills$: any;
  @select((s) => s.skillsList.isLoading) isSkillsListLoading$: any;
  @select((s) => s.globalSearchResult.globalSearchResult)
  globalSearchResult$: any;
  @select((s) => s.globalSearchResult.isLoading)
  isGlobalSearchResultLoading$: any;
  searchTerm: string = '';
  CandidateList!: any[];
  CompanyList!: any[];
  candidateMultiple: number = 10;
  companyMultiple: number = 10;
  candidateBySkillsMultiple = 10;
  candidateBySkillsList: any[] = [];
  isAllCandidateList: boolean = false;
  isAllCompanyList: boolean = false;
  isAllCandidatesBySkills: boolean = false;
  candidateProfessionGridStyle = {
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '24px',
    color: '#b5b5b5',
  };
  Subscriptions: Subscription[] = [];
  page = 1;
  ItemsPerPage = 20;
  count: number = 0;

  globalSearchResult: any;
  candidateSearchResult: any;
  candidateTotalRecords: any;
  companySearchResult: any;
  companyTotalRecords: any;
  skillSearchResult: any;
  skillTotalRecords: any;
  totalRecords: number = 0;

  constructor(
    private _globalSearchSvc: GlobalSearchService,
    private _route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.onGetSearchTerm();
  }

  onGetSearchTerm() {
    this._route.paramMap.subscribe({
      next: (params: any) => {
        this.searchTerm = params.get('searchTerm');
        this.onGlobalSearch(this.searchTerm);
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });

    // this._globalSearchSvc.searchTerm.subscribe({
    //   next: (response: any) => {
    //     this.searchTerm = response;
    //     // console.log('SEARCHTERM: ', this.searchTerm);
    //   },
    //   error: (err: any) => {
    //     console.warn('Error: ', err);
    //   },
    // });
  }

  onGlobalSearch(SearchTerm: string) {
    const Payload = {
      SearchTerm: SearchTerm,
      PageSize: this.ItemsPerPage,
      PageNumber: this.page,
    };
    this._globalSearchSvc.LoadGlobalSearch(Payload);

    this.globalSearchResult$.subscribe({
      next: (result: any) => {
        if (result) {
          this.globalSearchResult = result;
          console.log('global Search result', this.globalSearchResult);
          this.candidateSearchResult = this.globalSearchResult?.Candidate.Items;
          this.candidateTotalRecords =
            this.globalSearchResult?.Candidate.TotalSize;
          this.companySearchResult = this.globalSearchResult?.Company.Items;
          this.companyTotalRecords = result.Company?.TotalSize;
          this.skillSearchResult = this.globalSearchResult?.Skill.Items;
          this.skillTotalRecords = this.globalSearchResult?.Skill?.TotalSize;
          this.totalRecords = Math.max(
            this.candidateTotalRecords,
            this.companyTotalRecords,
            this.skillTotalRecords
          );
        }
      },
      error: (err: any) => {
        if (err) {
          console.warn('Error: ', err);
        }
      },
    });
  }

  onItemsPerPage(Count: number) {
    this.ItemsPerPage = 0;
    this.ItemsPerPage += Count;
  }

  pageChangeEvent($event: any) {
    this.page = $event;
    const Payload = {
      SearchTerm: this.searchTerm,
      PageSize: this.ItemsPerPage,
      PageNumber: this.page,
    };
    this._globalSearchSvc.LoadGlobalSearch(Payload);
  }

  ngOnDestroy(): void {
    this.Subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
