import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewSkillComponent } from './preview-skill.component';

describe('PreviewSkillComponent', () => {
  let component: PreviewSkillComponent;
  let fixture: ComponentFixture<PreviewSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewSkillComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
