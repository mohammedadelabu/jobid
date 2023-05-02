import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSelfieComponent } from './upload-selfie.component';

describe('UploadSelfieComponent', () => {
  let component: UploadSelfieComponent;
  let fixture: ComponentFixture<UploadSelfieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSelfieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSelfieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
