import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConvertLeadToDealComponent } from './convert-lead-to-deal.component';

describe('ConvertLeadToDealComponent', () => {
  let component: ConvertLeadToDealComponent;
  let fixture: ComponentFixture<ConvertLeadToDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConvertLeadToDealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConvertLeadToDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
