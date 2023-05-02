import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBranchLocationComponent } from './create-branch-location.component';

describe('CreateBranchLocationComponent', () => {
  let component: CreateBranchLocationComponent;
  let fixture: ComponentFixture<CreateBranchLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateBranchLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBranchLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
