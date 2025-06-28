import { inject, Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  collectionData,
  docData,
  deleteDoc,
  addDoc,
  setDoc,
} from '@angular/fire/firestore';
import { LyricInterface } from '../models/lyric.interface';
import { from, Observable, Observer } from 'rxjs';
import { Notification } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class Lyricsfb {
  private notifications = inject(Notification);
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

  addLyric(lyric: LyricInterface): Observable<string> {
    const promise = addDoc(this.LyricsCollection, lyric);
    return from(promise.then((docRef) => docRef.id));
  }

  removeLyric(id: string): Observable<void> {
    const lyricDoc = doc(this.firestore, 'lyrics', id);
    return from(
      deleteDoc(lyricDoc)
        .then(() => {
          this.notifications.showSuccess('Lyric deleted successfully');
        })
        .catch((error) => {
          this.notifications.showError(
            `Error deleting lyric: ${error.message}`
          );
          throw error; // Re-throw the error to
        })
    );
  }
  updateLyric(id: string, lyric: LyricInterface): Observable<void> {
    const lyricDoc = doc(this.firestore, 'lyrics', id);
    return from(setDoc(lyricDoc, lyric, { merge: true }));
  }
}
