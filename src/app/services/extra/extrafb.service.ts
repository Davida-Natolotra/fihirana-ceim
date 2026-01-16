import { Injectable, inject } from '@angular/core';
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
import { ExtraLyricInterface } from '../../models/extra-lyric.interface';
import { from, Observable } from 'rxjs';
import { Notification } from '../notification/notification.service';

@Injectable({
  providedIn: 'root',
})
export class ExtrafbService {
  private notifications = inject(Notification);
  firestore = inject(Firestore);
  LyricsCollection = collection(this.firestore, 'extra_lyrics');

  getExtraLyrics(): Observable<ExtraLyricInterface[]> {
    return collectionData(this.LyricsCollection, {
      idField: 'id',
    }) as Observable<ExtraLyricInterface[]>;
  }

  getExtraLyric(id: string): Observable<ExtraLyricInterface> {
    const lyricDoc = doc(this.firestore, 'extra_lyrics', id);
    return docData(lyricDoc, {
      idField: 'id',
    }) as Observable<ExtraLyricInterface>;
  }

  addExtraLyric(lyric: ExtraLyricInterface): Observable<string> {
    const promise = addDoc(this.LyricsCollection, {
      ...lyric,
      createdAt: new Date(),
    })
      .then((docRef) => {
        this.notifications.showSuccess('Lyric added successfully');
        return docRef.id;
      })
      .catch((error) => {
        this.notifications.showError(`Error adding lyric: ${error.message}`);
        throw error; // Re-throw the error to allow further handling if needed
      });
    return from(promise);
  }

  removeExtraLyric(id: string): Observable<void> {
    const lyricDoc = doc(this.firestore, 'extra_lyrics', id);
    return from(
      deleteDoc(lyricDoc)
        .then(() => {
          this.notifications.showSuccess('Extra lyric deleted successfully');
        })
        .catch((error) => {
          this.notifications.showError(
            `Error deleting lyric: ${error.message}`
          );
          throw error; // Re-throw the error to
        })
    );
  }
  updateLyric(id: string, lyric: ExtraLyricInterface): Observable<void> {
    const lyricDoc = doc(this.firestore, 'extra_lyrics', id);
    return from(
      setDoc(lyricDoc, { ...lyric, updatedAt: new Date() }, { merge: true })
        .then(() => {
          this.notifications.showSuccess('Lyric updated successfully');
        })
        .catch((error) => {
          this.notifications.showError(
            `Error updating lyric: ${error.message}`
          );
          throw error; // Re-throw the error to allow further handling if needed
        })
    );
  }
}
