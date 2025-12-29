import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistLyricEdit } from './playlist-lyric-edit';

describe('PlaylistLyricEdit', () => {
  let component: PlaylistLyricEdit;
  let fixture: ComponentFixture<PlaylistLyricEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistLyricEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistLyricEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
