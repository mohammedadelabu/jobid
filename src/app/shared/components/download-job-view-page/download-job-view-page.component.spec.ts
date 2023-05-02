import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadJobViewPageComponent } from './download-job-view-page.component';

describe('DownloadJobViewPageComponent', () => {
  let component: DownloadJobViewPageComponent;
  let fixture: ComponentFixture<DownloadJobViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadJobViewPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadJobViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
