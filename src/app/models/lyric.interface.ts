export interface LyricSection {
  type:
    | 'verse'
    | 'chorus'
    | 'bridge'
    | 'intro'
    | 'outro'
    | 'pre-chorus'
    | 'tag';
  order?: number;
  subtitle?: string; // Optional subtitle for the section
  lines: string[]; // Just plain text for easier indexing
}

export interface LyricInterface {
  id?: string; // Firestore document ID
  songNumber: string;
  title: string;
  searchTitle?: string; // Lowercase, stripped version for search
  allLyricsText?: string; // Flat text (for full-text search indexing)
  sections: LyricSection[];

  createdAt?: Date;
  updatedAt?: Date;
  key?: string; // Musical key of the song
}
