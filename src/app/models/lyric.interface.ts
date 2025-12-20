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
  songNumber?: number;
  suffix?: string; // Optional suffix for the song number
  title: string;
  searchTitle?: string; // Lowercase, stripped version for search
  allLyricsText?: string; // Flat text (for full-text search indexing)
  sections: LyricSection[];

  createdAt?: Date;
  updatedAt?: Date;
  key?: string; // Musical key of the song
}
