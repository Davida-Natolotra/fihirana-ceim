import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAvailableDialog } from './update-available-dialog';

describe('UpdateAvailableDialog', () => {
  let component: UpdateAvailableDialog;
  let fixture: ComponentFixture<UpdateAvailableDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateAvailableDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateAvailableDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
