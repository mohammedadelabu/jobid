import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedChatComponent } from './expanded-chat.component';

describe('ExpandedChatComponent', () => {
  let component: ExpandedChatComponent;
  let fixture: ComponentFixture<ExpandedChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandedChatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandedChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
