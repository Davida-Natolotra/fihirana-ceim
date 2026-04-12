import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStructureDialog } from './edit-structure.dialog';

describe('EditStructureDialog', () => {
  let component: EditStructureDialog;
  let fixture: ComponentFixture<EditStructureDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditStructureDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditStructureDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
