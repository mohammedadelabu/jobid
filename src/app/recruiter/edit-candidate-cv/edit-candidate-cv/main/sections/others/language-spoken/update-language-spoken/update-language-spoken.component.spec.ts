import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLanguageSpokenComponent } from './update-language-spoken.component';

describe('UpdateLanguageSpokenComponent', () => {
  let component: UpdateLanguageSpokenComponent;
  let fixture: ComponentFixture<UpdateLanguageSpokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLanguageSpokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLanguageSpokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
