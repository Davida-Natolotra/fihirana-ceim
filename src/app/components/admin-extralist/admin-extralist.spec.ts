import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminExtralist } from './admin-extralist';

describe('AdminExtralist', () => {
  let component: AdminExtralist;
  let fixture: ComponentFixture<AdminExtralist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminExtralist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminExtralist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
