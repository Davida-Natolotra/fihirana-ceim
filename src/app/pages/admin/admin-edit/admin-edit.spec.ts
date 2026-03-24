import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEdit } from './admin-edit';

describe('AdminEdit', () => {
  let component: AdminEdit;
  let fixture: ComponentFixture<AdminEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
