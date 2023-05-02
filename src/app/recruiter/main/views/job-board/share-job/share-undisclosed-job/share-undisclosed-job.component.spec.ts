import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareUndisclosedJobComponent } from './share-undisclosed-job.component';

describe('ShareUndisclosedJobComponent', () => {
  let component: ShareUndisclosedJobComponent;
  let fixture: ComponentFixture<ShareUndisclosedJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShareUndisclosedJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareUndisclosedJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
