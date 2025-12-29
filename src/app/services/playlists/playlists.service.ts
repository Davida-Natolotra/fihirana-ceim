import { Injectable, signal } from '@angular/core';
import { PlaylistInterface } from '../../models/playlist.interface';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {
  playlistsSig = signal<Array<PlaylistInterface>>([]);

  setPlaylists(playlists: Array<PlaylistInterface>) {
    this.playlistsSig.set(playlists);
  }
}
