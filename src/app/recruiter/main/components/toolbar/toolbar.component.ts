import { select } from '@angular-redux/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/models/types/country';
import { CountryListService } from 'src/app/services/country-list.service';
import { GlobalSearchService } from 'src/app/services/global-search.service';
import { IdentityService } from 'src/app/services/identity.service';
import { MessengerService } from 'src/app/services/messenger/messenger.service';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'recruiter-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  @select((s) => s.loggedInUser.loggedInUser) loggedInUser$: any;
  @select((s) => s.loggedInUser.isLoading) loggedInUserIsLoading$: any;
  @select((s) => s.loggedInUserInformation.loggedInUserInformation)
  loggedInUserInformation$: any;
  @select((s) => s.loggedInUserInformation.isLoading)
  loggedInUserInformationIsLoading$: any;
  searchTerm: string = '';
  // searchTermExist = false;
  countryList!: Country[];
  skillsCategoryList: any;
  loggedInUser: any;
  ProfileImageUrl: any;
  isSideNav!: boolean;
  subscriptions: Subscription[] = [];
  userRole: any;
  constructor(
    private _router: Router,
    private _countryListSvc: CountryListService,
    private _skillSvc: SkillService,
    private _identitySvc: IdentityService,
    private _globalSearchSvc: GlobalSearchService,
    private _messengerSvc: MessengerService
  ) {}

  ngOnInit(): void {
    this.onGetCountryList();
    this.onGetCandidateSkillsList();

    this.loggedInUser$.subscribe({
      next: (resp: any) => {
        if (resp) {
          this.onGetUserById(resp?.Id);
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });

    this.getLoggedUser();
  }

  getLoggedUser() {
    let user = this._identitySvc.getLoggedInUserData();
    this.userRole = user?.newRole?.RoleName;
  }

  OpenSidenav() {
    this._messengerSvc.sendOpenSideNavitionMessageBehaviorSubjet(true);
  }

  onSearch() {
    this.searchTerm;
    this._globalSearchSvc.searchTerm.next(this.searchTerm);
    this._router.navigate([`/recruiter/search/${this.searchTerm}`]);
  }

  onGetCountryList() {
    this.countryList = this._countryListSvc.getCountryList();
  }

  onGetCandidateSkillsList() {
    let subscription = this._skillSvc.getSkillsCategories().subscribe({
      next: (response: any) => {
        if (response) {
          this.skillsCategoryList = response.Data;
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  onGetCompanyList() {}

  // ongetLoggedInUserData() {
  //   this.loggedInUser = this._identitySvc.getLoggedInUserData();
  //   console.log('loggedInUser: ', this.loggedInUser);
  //   this.onGetUserById(this.loggedInUser.Id);
  // }
  onGetUserById(userId: string) {
    // let subscription = this._identitySvc.getUserById(userId).subscribe({
    //   next: (response: any) => {
    //     if (response) {
    //       console.log('onGetUserById: ', response);
    //       this.ProfileImageUrl = response.ProfileImageUrl;
    //     }
    //   },
    //   error: (err: any) => {
    //     console.warn('Error: ', err);
    //   },
    // });
    // this.subscriptions.push(subscription);

    this._identitySvc.LoadUserById(userId);
    let subscription = this.loggedInUserInformation$.subscribe({
      next: (response: any) => {
        if (response) {
          this.ProfileImageUrl = response.ProfileImageUrl;
        }
      },
      error: (err: any) => {
        console.warn('Error: ', err);
      },
    });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
