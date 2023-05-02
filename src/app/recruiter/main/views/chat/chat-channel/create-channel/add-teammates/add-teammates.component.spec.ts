import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTeammatesComponent } from './add-teammates.component';

describe('AddTeammatesComponent', () => {
  let component: AddTeammatesComponent;
  let fixture: ComponentFixture<AddTeammatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTeammatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTeammatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
