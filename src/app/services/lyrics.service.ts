import { Injectable, signal } from '@angular/core';
import { LyricInterface } from '../models/lyric.interface';

@Injectable({
  providedIn: 'root',
})
export class LyricsService {
  lyricsSig = signal<LyricInterface[]>([]);
}
