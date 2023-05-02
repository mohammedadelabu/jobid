import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateNewCandidateAccountComponent } from './admin-create-new-candidate-account.component';

describe('AdminCreateNewCandidateAccountComponent', () => {
  let component: AdminCreateNewCandidateAccountComponent;
  let fixture: ComponentFixture<AdminCreateNewCandidateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreateNewCandidateAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreateNewCandidateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
