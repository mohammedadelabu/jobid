import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchedSkillsCountComponent } from './matched-skills-count.component';

describe('MatchedSkillsCountComponent', () => {
  let component: MatchedSkillsCountComponent;
  let fixture: ComponentFixture<MatchedSkillsCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchedSkillsCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchedSkillsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
