import { Component, inject, OnInit } from '@angular/core';
import { PlaylistsService } from '../../../features/Playlist/state/playlists/playlists.service';
import { PlaylistEditSonglist } from '../../../features/Playlist/components/playlist-edit-songlist/playlist-edit-songlist';
import { PlaylistView } from '../../../features/Playlist/components/playlist-view/playlist-view';
import { TitleState } from '../../../features/appbar/state/title.state';

@Component({
  selector: 'app-playlist',
  imports: [PlaylistEditSonglist, PlaylistView],
  templateUrl: './playlist.html',
  styleUrl: './playlist.css',
  standalone: true,
})
export class Playlist implements OnInit {
  private playlistService = inject(PlaylistsService);
  private appTitle = inject(TitleState);

  isPlaylistEditing = this.playlistService.isEditingPlaylist();
  ngOnInit(): void {
    this.appTitle.setAppTitle('Playlist');
  }
}
