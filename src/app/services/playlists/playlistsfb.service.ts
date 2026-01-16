import { inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  setDoc,
} from '@angular/fire/firestore';
import { combineLatest, from, map, Observable, of, switchMap } from 'rxjs';
import { Notification } from '../notification/notification.service';
import { PlaylistInterface, Song } from '../../models/playlist.interface';

@Injectable({
  providedIn: 'root',
})
export class PlaylistsfbService {
  firestore = inject(Firestore);
  PlaylistsCollection = collection(this.firestore, 'playlists');
  private notifications = inject(Notification);

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
    const promise = addDoc(this.PlaylistsCollection, {
      ...playlist,
      createdAt: new Date(),
    })
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
      setDoc(
        playlistDoc,
        { ...playlist, updatedAt: new Date() },
        { merge: true }
      )
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

  getPlaylistLive(playlistId: string): Observable<PlaylistInterface | null> {
    const playlistDocRef = doc(this.firestore, `playlists/${playlistId}`);

    // 1. Listen to the specific Playlist document
    return docData(playlistDocRef, { idField: 'id' }).pipe(
      switchMap((playlist: any) => {
        if (!playlist || !playlist.songs || playlist.songs.length === 0) {
          return of(playlist || null);
        }

        // 2. Map the songs array to an array of Lyric document Observables
        const songDetailStreams$ = playlist.songs.map((song: Song) => {
          let lyricDocRef;
          if (song.isExtra) {
            // If it's an extra song, fetch from extra_lyrics collection
            lyricDocRef = doc(this.firestore, `extra_lyrics/${song.id}`);
          } else {
            lyricDocRef = doc(this.firestore, `lyrics/${song.id}`);
          }

          return docData(lyricDocRef).pipe(
            map((lyricData) => ({
              ...song,
              // Overwrite songlist data with live data from the Lyrics collection
              title: lyricData?.['title'] ?? song.title,
              key: lyricData?.['key'] ?? song.key, // Maps 'key' from Lyrics to 'key' in Song
            })),
            switchMap((updatedSong) =>
              updatedSong ? of(updatedSong) : of(song)
            )
          );
        });

        // 3. Combine them back into the playlist object
        return combineLatest(songDetailStreams$).pipe(
          map((hydratedSongs) => ({
            ...playlist,
            songs: hydratedSongs,
          }))
        );
      })
    );
  }
}
