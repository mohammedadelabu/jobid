import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchLocationsComponent } from './branch-locations.component';

describe('BranchLocationsComponent', () => {
  let component: BranchLocationsComponent;
  let fixture: ComponentFixture<BranchLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchLocationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
