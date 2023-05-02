import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationRoleDetailsComponent } from './application-role-details.component';

describe('ApplicationRoleDetailsComponent', () => {
  let component: ApplicationRoleDetailsComponent;
  let fixture: ComponentFixture<ApplicationRoleDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationRoleDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationRoleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
