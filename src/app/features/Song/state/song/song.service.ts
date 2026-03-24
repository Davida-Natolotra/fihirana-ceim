import {Injectable, signal, WritableSignal} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SongService {


  songIsExtra: WritableSignal<boolean> = signal(false);
  songIsAdmin: WritableSignal<boolean> = signal(false);

  setSongExtra(value: boolean) {
    this.songIsExtra.set(value);
  }

  setSongAdmin(value: boolean) {
    this.songIsAdmin.set(value);
  }

}
