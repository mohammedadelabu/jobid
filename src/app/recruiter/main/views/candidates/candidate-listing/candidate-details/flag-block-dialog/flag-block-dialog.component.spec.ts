import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagBlockDialogComponent } from './flag-block-dialog.component';

describe('FlagBlockDialogComponent', () => {
  let component: FlagBlockDialogComponent;
  let fixture: ComponentFixture<FlagBlockDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlagBlockDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagBlockDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
