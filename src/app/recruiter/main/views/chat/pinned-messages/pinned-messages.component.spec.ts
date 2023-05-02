import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PinnedMessagesComponent } from './pinned-messages.component';

describe('PinnedMessagesComponent', () => {
  let component: PinnedMessagesComponent;
  let fixture: ComponentFixture<PinnedMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PinnedMessagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PinnedMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
