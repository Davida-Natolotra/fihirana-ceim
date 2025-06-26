import { inject, Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  collectionData,
  docData,
} from '@angular/fire/firestore';
import { LyricInterface } from '../models/lyric.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Lyricsfb {
  firestore = inject(Firestore);
  LyricsCollection = collection(this.firestore, 'lyrics');
  getLyrics(): Observable<LyricInterface[]> {
    return collectionData(this.LyricsCollection, {
      idField: 'id',
    }) as Observable<LyricInterface[]>;
  }

  getLyric(id: string): Observable<LyricInterface> {
    const lyricDoc = doc(this.firestore, 'lyrics', id);
    return docData(lyricDoc, { idField: 'id' }) as Observable<LyricInterface>;
  }
}
