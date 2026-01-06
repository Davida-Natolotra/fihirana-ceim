import { Injectable, signal, computed } from '@angular/core';
import { PlaylistInterface } from '../../models/playlist.interface';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsService {
  playlistsSig = signal<Array<PlaylistInterface>>([]);
  currentPlaylist = signal<PlaylistInterface | null>(null);

  isPlaylist = signal(false);
  setIsPlaylist(isPlaylist: boolean) {
    this.isPlaylist.set(isPlaylist);
  }

  isEditingPlaylist = signal(false);
  setIsEditingPlaylist(isEditing: boolean) {
    this.isEditingPlaylist.set(isEditing);
  }

  setPlaylists(playlists: Array<PlaylistInterface>) {
    this.playlistsSig.set(playlists);
  }

  getPlaylist(id: string) {
    return computed(() =>
      this.playlistsSig().find((playlist) => playlist.id === id)
    );
  }
  setCurrentPlaylist(playlist: PlaylistInterface | null) {
    this.currentPlaylist.set(playlist);
  }
}
