import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadJobTemplateComponent } from './download-job-template.component';

describe('DownloadJobTemplateComponent', () => {
  let component: DownloadJobTemplateComponent;
  let fixture: ComponentFixture<DownloadJobTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadJobTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadJobTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
