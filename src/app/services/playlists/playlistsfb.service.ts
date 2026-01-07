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
import { LyricInterface } from '../../models/lyric.interface';
import { from, Observable, Observer } from 'rxjs';
import { Notification } from '../notification/notification.service';
import { PlaylistInterface } from '../../models/playlist.interface';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsfbService {
  private notifications = inject(Notification);
  firestore = inject(Firestore);
  PlaylistsCollection = collection(this.firestore, 'playlists');

  getPlaylists(): Observable<PlaylistInterface[]> {
    return collectionData(this.PlaylistsCollection, {
      idField: 'id',
    }) as Observable<PlaylistInterface[]>;
  }

  getPlaylist(id: string): Observable<PlaylistInterface> {
    const lyricDoc = doc(this.firestore, 'playlists', id);
    return docData(lyricDoc, {
      idField: 'id',
    }) as Observable<PlaylistInterface>;
  }

  addPlaylist(playlist: PlaylistInterface): Observable<string> {
    const promise = addDoc(this.PlaylistsCollection, playlist)
      .then((docRef) => {
        this.notifications.showSuccess('Playlist added successfully');
        return docRef.id;
      })
      .catch((error) => {
        this.notifications.showError(`Error adding playlist: ${error.message}`);
        throw error; // Re-throw the error to allow further handling if needed
      });
    return from(promise);
  }

  removePlaylist(id: string): Observable<void> {
    const playlistDoc = doc(this.firestore, 'playlists', id);
    return from(
      deleteDoc(playlistDoc)
        .then(() => {
          this.notifications.showSuccess('Playlist deleted successfully');
        })
        .catch((error) => {
          this.notifications.showError(
            `Error deleting playlist: ${error.message}`
          );
          throw error; // Re-throw the error to
        })
    );
  }
  updatePlaylist(id: string, playlist: PlaylistInterface): Observable<void> {
    const playlistDoc = doc(this.firestore, 'playlists', id);
    return from(
      setDoc(playlistDoc, playlist, { merge: true })
        .then(() => {
          this.notifications.showSuccess('Playlist updated successfully');
        })
        .catch((error) => {
          this.notifications.showError(
            `Error updating playlist: ${error.message}`
          );
          throw error; // Re-throw the error to allow further handling if needed
        })
    );
  }
}
