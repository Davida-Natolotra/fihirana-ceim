import { Injectable } from '@angular/core';
import {Lyricsfb} from '../../../Lyrics/api/lyricsfb/lyricsfb.service';
import {ExtrafbService} from '../../../Lyrics/api/extralyricfb/extrafb.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SongfbApi {
  constructor(
    private lyricsfb: Lyricsfb,
    private extralycsfb: ExtrafbService
  ) {}

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
