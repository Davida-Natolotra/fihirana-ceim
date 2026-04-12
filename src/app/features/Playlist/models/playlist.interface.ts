import {Timestamp} from '@angular/fire/firestore';

export interface PlaylistInterface {
  id: string; // Firestore document ID
  name: string;
  description?: string;
  songs: Song[]; // Array of LyricInterface IDs
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  isRemoved?: boolean;
}

export interface Song {
  id: string;
  isExtra: boolean;
  key?: string;
  title: string;
}
