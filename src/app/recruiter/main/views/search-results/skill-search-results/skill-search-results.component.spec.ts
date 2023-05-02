import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSearchResultsComponent } from './skill-search-results.component';

describe('SkillSearchResultsComponent', () => {
  let component: SkillSearchResultsComponent;
  let fixture: ComponentFixture<SkillSearchResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkillSearchResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillSearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
