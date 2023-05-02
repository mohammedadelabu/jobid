import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewUploadedCvComponent } from './preview-uploaded-cv.component';

describe('PreviewUploadedCvComponent', () => {
  let component: PreviewUploadedCvComponent;
  let fixture: ComponentFixture<PreviewUploadedCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewUploadedCvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewUploadedCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
