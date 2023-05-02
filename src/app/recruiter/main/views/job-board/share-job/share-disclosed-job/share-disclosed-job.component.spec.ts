import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareDisclosedJobComponent } from './share-disclosed-job.component';

describe('ShareDisclosedJobComponent', () => {
  let component: ShareDisclosedJobComponent;
  let fixture: ComponentFixture<ShareDisclosedJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareDisclosedJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareDisclosedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
