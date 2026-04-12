import {Component, inject} from '@angular/core';
import {PlaylistsService} from '../../../features/Playlist/state/playlists/playlists.service';
import {
  PlaylistEditSonglist
} from '../../../features/Playlist/components/playlist-edit-songlist/playlist-edit-songlist';
import {PlaylistView} from '../../../features/Playlist/components/playlist-view/playlist-view';

@Component({
  selector: 'app-playlist',
  imports: [PlaylistEditSonglist, PlaylistView],
  templateUrl: './playlist.html',
  styleUrl: './playlist.css',
  standalone: true
})
export class Playlist {
  private playlistService = inject(PlaylistsService);

  isPlaylistEditing = this.playlistService.isEditingPlaylist();
}
