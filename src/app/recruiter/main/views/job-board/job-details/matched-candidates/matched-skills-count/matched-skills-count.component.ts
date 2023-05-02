import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-matched-skills-count',
  templateUrl: './matched-skills-count.component.html',
  styleUrls: ['./matched-skills-count.component.scss'],
})
export class MatchedSkillsCountComponent implements OnInit {
  @Input('candidateSkillsString') candidateSkillsString!: string;
  @Input('JobDetails') JobDetails!: any;
  count!: number;
  onPercentageCounter!: number;

  constructor() {}

  ngOnInit(): void {
    this.onConvertStringToArray();
    this.onPercentageCount();
    // console.log('(this.JobDetails);: ', JSON.parse(this.JobDetails));
    // console.log('(this.candidateSkillsString): ', this.candidateSkillsString);
  }

  onConvertStringToArray() {
    let CandidateSkillsList = this.candidateSkillsString
      .toLowerCase()
      .split(',');

    // console.log('CandidateSkillsList: ', CandidateSkillsList);
    let z = [];
    for (let i = 0; i < CandidateSkillsList.length; i++) {
      let u = CandidateSkillsList[i].trim();
      z.push(u);
    }

    // console.log('zzzzz: ', z);

    let p = [];
    let q = JSON.parse(this.JobDetails);
    for (let i = 0; i < q.length; i++) {
      let u = q[i].toLowerCase().trim();
      p.push(u);
    }

    // console.log('ppppp: ', p);

    let x = JSON.parse(this.JobDetails);
    let y = CandidateSkillsList;
    // console.log('xxxxxxxxxxxxxx: ', x);
    this.onCompareMatchSkills(z, p);
  }

  onCompareMatchSkills(CandidateSkillsList: any, JobSkills: any) {
    const res = JobSkills.reduce((a: any, b: any) => {
      const l = CandidateSkillsList.filter((e: any) => e === b).length;
      if (l) a[b] = l;
      return a;
    }, {});
    // console.log('match: ', res);
    // console.log(typeof res);
    this.count = Object.keys(res).length;
    // console.log('his.count: ', this.count);
  }

  onPercentageCount() {
    let x = 50 / this.JobDetails?.length;
    this.onPercentageCounter = Math.ceil(x);
  }
}
