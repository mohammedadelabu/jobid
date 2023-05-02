import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareJobComponent } from './share-job.component';

describe('ShareJobComponent', () => {
  let component: ShareJobComponent;
  let fixture: ComponentFixture<ShareJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
