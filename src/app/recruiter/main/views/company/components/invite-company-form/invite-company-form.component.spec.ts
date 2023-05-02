import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InviteCompanyFormComponent } from './invite-company-form.component';

describe('InviteCompanyFormComponent', () => {
  let component: InviteCompanyFormComponent;
  let fixture: ComponentFixture<InviteCompanyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InviteCompanyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InviteCompanyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
