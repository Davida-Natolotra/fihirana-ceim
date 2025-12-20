import { LyricSection } from './lyric.interface';

export interface ExtraLyricInterface {
  id?: string; // Firestore document ID
  title: string;
  searchTitle?: string; // Lowercase, stripped version for search
  allLyricsText?: string; // Flat text (for full-text search indexing)
  sections: LyricSection[];

  createdAt?: Date;
  updatedAt?: Date;
  key?: string; // Musical key of the song
}
