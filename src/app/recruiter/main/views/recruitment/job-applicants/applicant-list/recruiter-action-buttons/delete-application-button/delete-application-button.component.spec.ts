import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteApplicationButtonComponent } from './delete-application-button.component';

describe('DeleteApplicationButtonComponent', () => {
  let component: DeleteApplicationButtonComponent;
  let fixture: ComponentFixture<DeleteApplicationButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteApplicationButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteApplicationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
