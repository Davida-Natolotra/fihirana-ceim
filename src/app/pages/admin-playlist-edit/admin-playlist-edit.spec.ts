import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlaylistEdit } from './admin-playlist-edit';

describe('AdminPlaylistEdit', () => {
  let component: AdminPlaylistEdit;
  let fixture: ComponentFixture<AdminPlaylistEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPlaylistEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPlaylistEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
