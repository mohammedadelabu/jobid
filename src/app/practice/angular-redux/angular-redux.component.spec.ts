import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularReduxComponent } from './angular-redux.component';

describe('AngularReduxComponent', () => {
  let component: AngularReduxComponent;
  let fixture: ComponentFixture<AngularReduxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularReduxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularReduxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
