import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogDelete } from './confirm-dialog-delete';

describe('ConfirmDialogDelete', () => {
  let component: ConfirmDialogDelete;
  let fixture: ComponentFixture<ConfirmDialogDelete>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDialogDelete]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDialogDelete);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
