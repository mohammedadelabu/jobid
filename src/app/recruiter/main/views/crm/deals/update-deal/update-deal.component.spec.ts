import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDealComponent } from './update-deal.component';

describe('UpdateDealComponent', () => {
  let component: UpdateDealComponent;
  let fixture: ComponentFixture<UpdateDealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDealComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
