import {Component, inject, OnInit, signal, WritableSignal,} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaylistsService} from '../../state/playlists/playlists.service';
import {PlaylistInterface} from '../../models/playlist.interface';
import {PlaylistsfbService} from '../../api/playlistfb/playlistsfb.service';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {DragDropModule,} from '@angular/cdk/drag-drop';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {LyricsService} from '../../../Lyrics/state/lyrics/lyrics.service';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SongService} from '../../../Song/state/song/song.service';
import {EditSonglistService} from '../../services/edit-songlist.service';

@Component({
  selector: 'app-playlist-view',
  imports: [
    MatListModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './playlist-view.html',
  styleUrl: './playlist-view.css',
  standalone: true
})
export class PlaylistView implements OnInit {
  playlistsService = inject(PlaylistsService);
  lyricService = inject(LyricsService);
  editSonglistService = inject(EditSonglistService)
// Signal to track loading and playlist state
  isLoading: WritableSignal<boolean> = signal(true);
  currentPlaylist: WritableSignal<PlaylistInterface | null> = signal(null);
  error: WritableSignal<string | null> = signal(null);
  isEditing: Boolean = false;
  isLocked: Boolean = false;
  playlistsfbService = inject(PlaylistsfbService);
  songService = inject(SongService);
  protected readonly open = open;
  private route = inject(ActivatedRoute);
  playlist_id = this.route.snapshot.paramMap.get('id');
  private router = inject(Router);

  ngOnInit() {
    this.isLoading.set(true);
    this.error.set(null);

    this.playlistsfbService.getPlaylistLive(this.playlist_id!).subscribe({
      next: (playlist) => {
        this.currentPlaylist.set(playlist);
        this.playlistsService.setCurrentPlaylist(playlist);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading playlist:', err);
        this.error.set('Failed to load playlist');
        this.isLoading.set(false);
      },
    });
  }


  goBackLouange() {
    this.router.navigate(['louange']);
  }

  openSongRead(songId: string, isExtra: boolean) {
    if (
      this.route.snapshot.url.some((segment) =>
        segment.path.includes('playlist-edit')
      )
    ) {
      this.songService.setSongAdmin(true);
    } else {
      this.songService.setSongAdmin(false);
    }
    if (isExtra) {
      this.router.navigate(['song/extralyric', songId]);
    } else {
      this.router.navigate(['song', songId]);
    }
  }

  // Method to truncate title for display - only on mobile screens
  getTruncatedTitle(title: string): string {
    // Check if it's a mobile screen (typically 768px or less)
    const isMobile = window.innerWidth <= 768;

    if (isMobile && title.length > 30) {
      return title.substring(0, 30) + '...';
    }
    return title;
  }
}
