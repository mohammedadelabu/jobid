import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealJobPostComponent } from './deal-job-post.component';

describe('DealJobPostComponent', () => {
  let component: DealJobPostComponent;
  let fixture: ComponentFixture<DealJobPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealJobPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealJobPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
