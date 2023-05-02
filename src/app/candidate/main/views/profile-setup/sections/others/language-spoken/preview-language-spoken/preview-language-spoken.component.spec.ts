import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewLanguageSpokenComponent } from './preview-language-spoken.component';

describe('PreviewLanguageSpokenComponent', () => {
  let component: PreviewLanguageSpokenComponent;
  let fixture: ComponentFixture<PreviewLanguageSpokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewLanguageSpokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewLanguageSpokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
