import { Injectable, signal, WritableSignal } from '@angular/core';
import { Lyricsfb } from '../lyrics/lyricsfb.service';
import { ExtrafbService } from '../extra/extrafb.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  constructor(
    private lyricsfb: Lyricsfb,
    private extralycsfb: ExtrafbService
  ) {}

  songIsExtra: WritableSignal<boolean> = signal(false);
  songIsAdmin: WritableSignal<boolean> = signal(false);

  setSongExtra(value: boolean) {
    this.songIsExtra.set(value);
  }

  setSongAdmin(value: boolean) {
    this.songIsAdmin.set(value);
  }

  fetchSong({
    songId,
    isExtra,
  }: {
    songId: string;
    isExtra: boolean;
  }): Observable<any> {
    if (isExtra) {
      return this.extralycsfb.getExtraLyric(songId);
    } else {
      return this.lyricsfb.getLyric(songId);
    }
  }

  updateSong({
    songId,
    isExtra,
    data,
  }: {
    songId: string;
    isExtra: boolean;
    data: any;
  }): Observable<void> {
    if (isExtra) {
      return this.extralycsfb.updateLyric(songId, data);
    } else {
      return this.lyricsfb.updateLyric(songId, data);
    }
  }
}
