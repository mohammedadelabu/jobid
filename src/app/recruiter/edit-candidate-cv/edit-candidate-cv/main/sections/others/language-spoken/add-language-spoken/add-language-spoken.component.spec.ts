import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLanguageSpokenComponent } from './add-language-spoken.component';

describe('AddLanguageSpokenComponent', () => {
  let component: AddLanguageSpokenComponent;
  let fixture: ComponentFixture<AddLanguageSpokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLanguageSpokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLanguageSpokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
