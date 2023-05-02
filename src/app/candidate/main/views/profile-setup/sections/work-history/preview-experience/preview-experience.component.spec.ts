import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewExperienceComponent } from './preview-experience.component';

describe('PreviewExperienceComponent', () => {
  let component: PreviewExperienceComponent;
  let fixture: ComponentFixture<PreviewExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewExperienceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
