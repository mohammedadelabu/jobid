import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRecruitionStatusComponent } from './update-recruition-status.component';

describe('UpdateRecruitionStatusComponent', () => {
  let component: UpdateRecruitionStatusComponent;
  let fixture: ComponentFixture<UpdateRecruitionStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRecruitionStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRecruitionStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
