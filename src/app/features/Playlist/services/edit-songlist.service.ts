import {inject, Injectable} from '@angular/core';
import {PlaylistInterface} from '../models/playlist.interface';
import {PlaylistsfbService} from '../api/playlistfb/playlistsfb.service';
import {PlaylistsService} from '../state/playlists/playlists.service';

@Injectable({
  providedIn: 'root'
})
export class EditSonglistService {
  private playlistsfbService = inject(PlaylistsfbService);
  private playlistsService = inject(PlaylistsService);

  removeSong(songId: string, playlist_id: string | null) {
    const currentPlaylist = this.playlistsService.currentPlaylist();
    if (!currentPlaylist || !playlist_id) {
      console.error('Cannot remove song: no playlist loaded');
      return;
    }
    const updatedSongs = (currentPlaylist.songs || []).filter((song) => song.id !== songId);
    const updatedPlaylist: PlaylistInterface = {
      ...currentPlaylist,
      songs: updatedSongs,
    };
    this.playlistsfbService
      .updatePlaylist(playlist_id, updatedPlaylist)
      .subscribe({
        next: () => {
          console.log('Song removed from playlist successfully');
          this.playlistsService.setCurrentPlaylist(updatedPlaylist);
        },
        error: (err) => {
          console.error('Error removing song from playlist:', err);
        },
      });
  }
}
