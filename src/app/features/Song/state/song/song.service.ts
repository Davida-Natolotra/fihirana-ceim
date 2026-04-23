import {Injectable, signal, WritableSignal} from '@angular/core';
import {Song} from '../../../Playlist/models/playlist.interface';

@Injectable({
  providedIn: 'root',
})
export class SongService {


  songIsExtra: WritableSignal<boolean> = signal(false);
  songIsAdmin: WritableSignal<boolean> = signal(false);
  currentSong: WritableSignal<Song | any> = signal({});

  setSongExtra(value: boolean) {
    this.songIsExtra.set(value);
  }

  setSongAdmin(value: boolean) {
    this.songIsAdmin.set(value);
  }

  setCurrentSong(song: Song) {
    this.currentSong.set(song)
  }
}
