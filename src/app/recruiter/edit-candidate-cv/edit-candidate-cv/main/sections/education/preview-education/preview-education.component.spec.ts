import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewEducationComponent } from './preview-education.component';

describe('PreviewEducationComponent', () => {
  let component: PreviewEducationComponent;
  let fixture: ComponentFixture<PreviewEducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewEducationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
