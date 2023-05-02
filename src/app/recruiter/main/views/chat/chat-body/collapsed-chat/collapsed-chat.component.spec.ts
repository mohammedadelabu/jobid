import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollapsedChatComponent } from './collapsed-chat.component';

describe('CollapsedChatComponent', () => {
  let component: CollapsedChatComponent;
  let fixture: ComponentFixture<CollapsedChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollapsedChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollapsedChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
