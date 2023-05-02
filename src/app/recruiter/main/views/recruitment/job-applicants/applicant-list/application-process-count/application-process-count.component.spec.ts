import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationProcessCountComponent } from './application-process-count.component';

describe('ApplicationProcessCountComponent', () => {
  let component: ApplicationProcessCountComponent;
  let fixture: ComponentFixture<ApplicationProcessCountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationProcessCountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationProcessCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
