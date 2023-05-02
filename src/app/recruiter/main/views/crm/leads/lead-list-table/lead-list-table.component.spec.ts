import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadListTableComponent } from './lead-list-table.component';

describe('LeadListTableComponent', () => {
  let component: LeadListTableComponent;
  let fixture: ComponentFixture<LeadListTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadListTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
