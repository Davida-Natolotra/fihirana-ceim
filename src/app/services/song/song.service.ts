import { Injectable, signal } from '@angular/core';
import { Lyricsfb } from '../lyrics/lyricsfb.service';
import { ExtrafbService } from '../extra/extrafb.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  songIsExtra = signal(false);

  setSongIsExtra(isExtra: boolean) {
    this.songIsExtra.set(isExtra);
  }

  constructor(
    private lyricsfb: Lyricsfb,
    private extralycsfb: ExtrafbService
  ) {}

  fetchSong(songId: string): Observable<any> {
    if (this.songIsExtra()) {
      return this.extralycsfb.getExtraLyric(songId);
    } else {
      return this.lyricsfb.getLyric(songId);
    }
  }

  updateSong(songId: string, data: any): Observable<void> {
    if (this.songIsExtra()) {
      return this.extralycsfb.updateLyric(songId, data);
    } else {
      return this.lyricsfb.updateLyric(songId, data);
    }
  }
}
