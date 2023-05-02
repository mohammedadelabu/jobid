import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { map, Observable, retry, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from 'src/app/models/types/skill';
import {
  FETCH_CANDIDATE_LIST_BY_SKILLS,
  FETCH_CANDIDATE_LIST_BY_SKILLS_ERROR,
  FETCH_CANDIDATE_LIST_BY_SKILLS_SUCCESS,
  FETCH_SKILLS_LIST,
  FETCH_SKILLS_LIST_ERROR,
  FETCH_SKILLS_LIST_SUCCESS,
} from 'src/STORE/_skill.store copy/skill.actions';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'src/STORE/store';
import {
  FETCH_DEALS_LIST_ERROR,
  FETCH_DEALS_LIST_SUCCESS,
} from 'src/STORE/_deal.store/deal.actions';

@Injectable({
  providedIn: 'root',
})
export class SkillService implements OnDestroy {
  GetAllSkillsUrl = environment.baseUrl + 'api/Skills/GetAllSkills/';
  GetSkillsCategoriesUrl =
    environment.baseUrl + 'api/SkillCategory/GetSkillsCategories';
  AddSkillUrl = environment.baseUrl + 'api/Skills/AddSkill/';
  UpdateSkillUrl = environment.baseUrl + 'api/Skills/UpdateSkill/';
  RemoveSkillUrl = environment.baseUrl + 'api/Skills/RemoveSkill/';
  SearchCandidateBySkillsUrl = environment.baseUrl + 'api/Skills/SearchSkills/';
  SearchCandidateBySkillsPagedUrl =
    environment.baseUrl + 'api/Skills/SearchSkillsPaged/';
  SearchJobSkillsPagedUrl =
    environment.baseUrl + 'api/Skills/SearchJobSkillsPaged/';

  AddSkillsCategoriesUrl =
    environment.baseUrl + 'api/SkillCategory/AddSkillsCategories/';

  subscriptions: Subscription[] = [];
  constructor(private _http: HttpClient, private ngRedux: NgRedux<IAppState>) {}

  addSkill(candidateId: string, Skill: Skill): Observable<any> {
    return this._http.post<any>(`${this.AddSkillUrl}${candidateId}`, Skill);
  }

  getCandidateSkillSet(candidateId: string): Observable<any> {
    return this._http.get<any>(`${this.GetAllSkillsUrl}${candidateId}`).pipe(
      retry(4),
      map((response: any) => {
        if (response) {
          const Body = response?.Data;
          return Body;
        }
      })
    );
  }

  getSkillsCategories() {
    return this._http.get<any>(this.GetSkillsCategoriesUrl);
  }

  // getAllSkills() {
  //   return this._http
  //     .get<any>(this.GetAllSkillsUrl, {
  //       observe: 'response',
  //       // observe: 'events',
  //     })
  //     .pipe(
  //       map((response: any) => {
  //         const Body = response.body;
  //         let skills: any = Body.Data;
  //         let allSkills: Skill_[] = [];
  //         if (response.status === 200) {
  //           if (Body.ResponseCode == '200') {
  //             // console.log("All skills are available");
  //             for (let key in skills) {
  //               let skill: Skill_ = {
  //                 // Id: skills[key].Id,
  //                 Skills: skills[key].Skills.split(','),
  //               };
  //               // allSkills.push({ ...skill, key: key });
  //               skill.Skills.forEach((sk: any) => {
  //                 if (sk.trim().length > 0) {
  //                   allSkills.push(sk.trim());
  //                 }
  //               });
  //               // allSkills.push({ ...skill});
  //             }
  //           }
  //         }
  //         // console.log("All skills are available: ", allSkills);
  //         let uniqueChars = [...new Set(allSkills.sort())];
  //         return {
  //           Data: uniqueChars,
  //           Message: Body.ResponseMessage,
  //         };
  //       })
  //     );
  // }

  loadAllSkills() {
    this.ngRedux.dispatch({ type: FETCH_SKILLS_LIST });
    let subscription = this._http
      .get<any>(this.GetAllSkillsUrl, {
        observe: 'response',
        // observe: 'events',
      })
      .pipe(
        map((response: any) => {
          const Body = response?.body;
          let skills: any = Body.Data;
          let allSkills: Skill_[] = [];
          if (response.status === 200) {
            if (Body.ResponseCode == '200') {
              // console.log("All skills are available");
              for (let key in skills) {
                let skill: Skill_ = {
                  // Id: skills[key].Id,
                  Skills: skills[key].Skills.split(','),
                };
                // allSkills.push({ ...skill, key: key });
                skill.Skills.forEach((sk: any) => {
                  if (sk.trim().length > 0) {
                    allSkills.push(sk.trim());
                  }
                });
                // allSkills.push({ ...skill});
              }
            }
          }
          // console.log("All skills are available: ", allSkills);
          let uniqueChars = [...new Set(allSkills.sort())];
          return {
            Data: uniqueChars,
            Message: Body.ResponseMessage,
          };
        })
      )
      .subscribe({
        next: (response: any) => {
          this.ngRedux.dispatch({
            type: FETCH_SKILLS_LIST_SUCCESS,
            payload: response.Data,
          });
        },
        error: (err: any) => {
          this.ngRedux.dispatch({
            type: FETCH_SKILLS_LIST_ERROR,
            payload: err,
          });
        },
      });
    this.subscriptions.push(subscription);
  }

  searchJobSkills(searchTerm: string) {
    return this._http.get<{ Data: { SkillName: string }[] }>(
      `${this.SearchJobSkillsPagedUrl}${searchTerm}`
    );
  }

  searchCandidatesBySkills(Skillset: any): Observable<any> {
    return this._http.get<any>(`${this.SearchCandidateBySkillsUrl}${Skillset}`);
  }

  searchCandidatesBySkillsPaged(
    Skillset: string,
    queryParams: string
  ): Observable<any> {
    return this._http.get<any>(
      `${this.SearchCandidateBySkillsPagedUrl}${Skillset}${queryParams}`
    );
  }

  LoadCandidatesBySkills(Skillset: any) {
    this.ngRedux.dispatch({ type: FETCH_CANDIDATE_LIST_BY_SKILLS });
    this._http
      .get<any>(`${this.SearchCandidateBySkillsUrl}${Skillset}`)
      .subscribe({
        next: (response: any) => {
          if (response) {
            this.ngRedux.dispatch({
              type: FETCH_CANDIDATE_LIST_BY_SKILLS_SUCCESS,
              payload: response?.Data[0],
            });
          }
        },
        error: (err: any) => {
          if (err) {
            this.ngRedux.dispatch({
              type: FETCH_CANDIDATE_LIST_BY_SKILLS_ERROR,
              payload: err,
            });
          }
        },
      });
  }

  updateSkill(SkillId: string, Skills: any) {
    return this._http.put(`${this.UpdateSkillUrl}${SkillId}`, Skills);
  }

  removeSkill(id: string) {
    return this._http.delete(`${this.RemoveSkillUrl}${id}`);
  }

  addSkillsCategory(category: any) {
    return this._http.post(`${this.AddSkillsCategoriesUrl}`, category);
  }

  ngOnDestroy(): void {
    localStorage.removeItem('JOB_SKILLS');
    localStorage.removeItem('Interview_Processes');
    this.subscriptions.forEach((x) => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}

interface Skill_ {
  // Id: string;
  Skills: string[];
  // key?: any;
}
