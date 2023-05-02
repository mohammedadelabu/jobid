import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateJobFromDealComponent } from './create-job-from-deal.component';

describe('CreateJobFromDealComponent', () => {
  let component: CreateJobFromDealComponent;
  let fixture: ComponentFixture<CreateJobFromDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateJobFromDealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateJobFromDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
