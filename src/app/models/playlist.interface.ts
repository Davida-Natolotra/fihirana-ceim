export interface PlaylistInterface {
  id?: string; // Firestore document ID
  name: string;
  description?: string;
  songs: Song[]; // Array of LyricInterface IDs
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Song {
  id: string;
  isExtra: boolean;
}
