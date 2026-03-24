import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditKeyDialog } from './edit-key.dialog';

describe('EditKeyDialog', () => {
  let component: EditKeyDialog;
  let fixture: ComponentFixture<EditKeyDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditKeyDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditKeyDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
