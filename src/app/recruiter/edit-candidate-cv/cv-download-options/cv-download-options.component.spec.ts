import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvDownloadOptionsComponent } from './cv-download-options.component';

describe('CvDownloadOptionsComponent', () => {
  let component: CvDownloadOptionsComponent;
  let fixture: ComponentFixture<CvDownloadOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvDownloadOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvDownloadOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
