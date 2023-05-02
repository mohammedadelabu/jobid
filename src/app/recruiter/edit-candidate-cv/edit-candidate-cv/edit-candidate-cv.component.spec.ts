import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCandidateCvComponent } from './edit-candidate-cv.component';

describe('EditCandidateCvComponent', () => {
  let component: EditCandidateCvComponent;
  let fixture: ComponentFixture<EditCandidateCvComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCandidateCvComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCandidateCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
