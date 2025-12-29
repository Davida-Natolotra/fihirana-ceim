import { Injectable, signal } from '@angular/core';
import { ExtraLyricInterface } from '../../models/extra-lyric.interface';
import { doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { LyricInterface } from '../../models/lyric.interface';

@Injectable({
  providedIn: 'root',
})
export class ExtralyricsService {
  extraLyricSig = signal<ExtraLyricInterface[]>([]);

  loadExtraLyric(lyrics: ExtraLyricInterface[]) {
    this.extraLyricSig.set(lyrics);
  }

  addExtraLyric(lyric: ExtraLyricInterface) {
    const currentLyrics = this.extraLyricSig();
    this.extraLyricSig.set([...currentLyrics, lyric]);
  }

  updateExtraLyric(updatedLyric: ExtraLyricInterface) {
    const currentLyrics = this.extraLyricSig();
    const index = currentLyrics.findIndex((l) => l.id === updatedLyric.id);
    if (index !== -1) {
      currentLyrics[index] = updatedLyric;
      this.extraLyricSig.set([...currentLyrics]);
    }
  }
  deleteExtraLyric(id: string) {
    const currentLyrics = this.extraLyricSig();
    const updatedLyrics = currentLyrics.filter((l) => l.id !== id);
    this.extraLyricSig.set(updatedLyrics);
  }
}
