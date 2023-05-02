import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiApplicationRequestComponent } from './multi-application-request.component';

describe('MultiApplicationRequestComponent', () => {
  let component: MultiApplicationRequestComponent;
  let fixture: ComponentFixture<MultiApplicationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultiApplicationRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiApplicationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
