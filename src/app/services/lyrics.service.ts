import { Injectable, signal } from '@angular/core';
import { LyricInterface } from '../models/lyric.interface';
import { LyricTransformInterface } from '../models/lyric-transf.interface';

@Injectable({
  providedIn: 'root',
})
export class LyricsService {
  lyricsSig = signal<LyricTransformInterface[]>([]);

  addLyric(lyric: LyricInterface) {
    const currentLyrics = this.lyricsSig();
    this.lyricsSig.set([...currentLyrics, lyric]);
  }
  updateLyric(updatedLyric: LyricInterface) {
    const currentLyrics = this.lyricsSig();
    const index = currentLyrics.findIndex((l) => l.id === updatedLyric.id);
    if (index !== -1) {
      currentLyrics[index] = updatedLyric;
      this.lyricsSig.set([...currentLyrics]);
    }
  }
  deleteLyric(id: string) {
    const currentLyrics = this.lyricsSig();
    const updatedLyrics = currentLyrics.filter((l) => l.id !== id);
    this.lyricsSig.set(updatedLyrics);
  }
}
