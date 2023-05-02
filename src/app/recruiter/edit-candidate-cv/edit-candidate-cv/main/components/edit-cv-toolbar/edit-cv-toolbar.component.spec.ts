import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCvToolbarComponent } from './edit-cv-toolbar.component';

describe('EditCvToolbarComponent', () => {
  let component: EditCvToolbarComponent;
  let fixture: ComponentFixture<EditCvToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCvToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCvToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
