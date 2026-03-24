import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistEditSonglist } from './playlist-edit-songlist';

describe('PlaylistEditSonglist', () => {
  let component: PlaylistEditSonglist;
  let fixture: ComponentFixture<PlaylistEditSonglist>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaylistEditSonglist]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaylistEditSonglist);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
