import {Injectable, signal, WritableSignal} from '@angular/core';
import {PlaylistInterface} from '../models/playlist.interface';
import {PlaylistsfbService} from '../api/playlistfb/playlistsfb.service';

@Injectable({
  providedIn: 'root'
})
export class EditSonglistService {
  currentPlaylist: WritableSignal<PlaylistInterface | null> = signal(null);

  constructor(private playlistsfbService: PlaylistsfbService) {
  }

  removeSong(songId: string, playlist_id: string | null) {
    const updatedSongs = [...(this.currentPlaylist()!.songs || [])];
    const index = updatedSongs.findIndex((song) => song.id === songId);
    if (index !== -1) {
      updatedSongs.splice(index, 1);
    }
    const updatedPlaylist = {
      ...this.currentPlaylist(),
      songs: updatedSongs,
    } as PlaylistInterface;
    this.playlistsfbService
      .updatePlaylist(playlist_id!, updatedPlaylist)
      .subscribe({
        next: () => {
          console.log('Song removed from playlist successfully');
          this.currentPlaylist.set(updatedPlaylist);
        },
        error: (err) => {
          console.error('Error removing song from playlist:', err);
        },
      });
  }
}
