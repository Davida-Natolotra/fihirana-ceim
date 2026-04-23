import { Component, OnInit } from '@angular/core';
import { PlaylistEditSonglist } from '../../../features/Playlist/components/playlist-edit-songlist/playlist-edit-songlist';
import { TitleState } from '../../../features/appbar/state/title.state';

@Component({
  selector: 'app-admin-playlist-edit',
  imports: [PlaylistEditSonglist],
  templateUrl: './admin-playlist-edit.html',
  styleUrl: './admin-playlist-edit.css',
})
export class AdminPlaylistEdit implements OnInit {
  constructor(private appTitle: TitleState) {}
  ngOnInit(): void {
    this.appTitle.setAppTitle('Playlist');
  }
}
