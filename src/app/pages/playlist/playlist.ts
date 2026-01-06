import { Component, inject } from '@angular/core';
import { PlaylistsService } from '../../services/playlists/playlists.service';
import { PlaylistEditSonglist } from '../../components/playlist-edit-songlist/playlist-edit-songlist';
import { PlaylistView } from '../../components/playlist-view/playlist-view';

@Component({
  selector: 'app-playlist',
  imports: [PlaylistEditSonglist, PlaylistView],
  templateUrl: './playlist.html',
  styleUrl: './playlist.css',
})
export class Playlist {
  private playlistService = inject(PlaylistsService);

  isPlaylistEditing = this.playlistService.isEditingPlaylist();
}
