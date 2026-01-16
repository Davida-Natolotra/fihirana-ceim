import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSongRead } from './admin-song-read';

describe('AdminSongRead', () => {
  let component: AdminSongRead;
  let fixture: ComponentFixture<AdminSongRead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSongRead]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSongRead);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
