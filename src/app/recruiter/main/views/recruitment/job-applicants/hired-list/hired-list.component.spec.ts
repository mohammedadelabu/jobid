import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiredListComponent } from './hired-list.component';

describe('HiredListComponent', () => {
  let component: HiredListComponent;
  let fixture: ComponentFixture<HiredListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiredListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiredListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
