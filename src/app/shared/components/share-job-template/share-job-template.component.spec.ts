import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareJobTemplateComponent } from './share-job-template.component';

describe('ShareJobTemplateComponent', () => {
  let component: ShareJobTemplateComponent;
  let fixture: ComponentFixture<ShareJobTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareJobTemplateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareJobTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
