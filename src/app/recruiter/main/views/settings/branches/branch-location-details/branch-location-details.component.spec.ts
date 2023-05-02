import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchLocationDetailsComponent } from './branch-location-details.component';

describe('BranchLocationDetailsComponent', () => {
  let component: BranchLocationDetailsComponent;
  let fixture: ComponentFixture<BranchLocationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchLocationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchLocationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
