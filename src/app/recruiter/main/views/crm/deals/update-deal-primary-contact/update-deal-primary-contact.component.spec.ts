import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDealPrimaryContactComponent } from './update-deal-primary-contact.component';

describe('UpdateDealPrimaryContactComponent', () => {
  let component: UpdateDealPrimaryContactComponent;
  let fixture: ComponentFixture<UpdateDealPrimaryContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDealPrimaryContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDealPrimaryContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
