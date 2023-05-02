import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDealCompanyComponent } from './update-deal-company.component';

describe('UpdateDealCompanyComponent', () => {
  let component: UpdateDealCompanyComponent;
  let fixture: ComponentFixture<UpdateDealCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateDealCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDealCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
