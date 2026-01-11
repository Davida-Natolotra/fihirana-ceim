import {Component, inject, OnInit, signal, WritableSignal,} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlaylistsService} from '../../services/playlists/playlists.service';
import {PlaylistInterface, Song} from '../../models/playlist.interface';
import {PlaylistsfbService} from '../../services/playlists/playlistsfb.service';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem,} from '@angular/cdk/drag-drop';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {LyricsService} from '../../services/lyrics/lyrics.service';
import {MatSortModule} from '@angular/material/sort';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DragLists} from '../drag-lists/drag-lists';
import {ExtralyricsService} from '../../services/extra/extralyrics.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

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
    DragLists,
    MatProgressSpinnerModule,
  ],
  templateUrl: './playlist-view.html',
  styleUrl: './playlist-view.css',
})
export class PlaylistView implements OnInit {
  playlistsService = inject(PlaylistsService);
  lyricService = inject(LyricsService);
  extraLyricService = inject(ExtralyricsService);
  // Signal to track loading and playlist state
  isLoading: WritableSignal<boolean> = signal(true);
  currentPlaylist: WritableSignal<PlaylistInterface | null> = signal(null);
  error: WritableSignal<string | null> = signal(null);
  isEditing: Boolean = false;
  playlistsfbService = inject(PlaylistsfbService);
  protected readonly open = open;
  private route = inject(ActivatedRoute);
  playlist_id = this.route.snapshot.paramMap.get('id');
  private router = inject(Router);

  ngOnInit() {
    this.isLoading.set(true);
    this.error.set(null);

    this.playlistsfbService.getPlaylistLive(this.playlist_id!).subscribe({
      next: (playlist) => {
        console.log('Loaded playlist:', playlist);
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

  drop(event: CdkDragDrop<Song[], any, any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.UpdateSongOrder(event.container.data);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.UpdateSongOrder(event.container.data);
    }
  }

  UpdateSongOrder(data: Song[]) {
    const updatedPlaylist = {
      ...this.currentPlaylist(),
      songs: data,
    } as PlaylistInterface;

    this.playlistsfbService
      .updatePlaylist(this.playlist_id!, updatedPlaylist)
      .subscribe({
        next: () => {
          console.log('Playlist updated successfully');
          this.currentPlaylist.set(updatedPlaylist);
        },
        error: (err) => {
          console.error('Error updating playlist:', err);
        },
      });
  }

  removeSong(songId: string) {
    const updatedSongs = [...(this.currentPlaylist()!.songs || [])];
    const index = updatedSongs.findIndex((song) => song.id === songId);
    if (index !== -1) {
      updatedSongs.splice(index, 1);
    }
    const updatedPlaylist = {
      ...this.currentPlaylist(),
      songs: updatedSongs,
    } as PlaylistInterface;
    this.playlistsfbService
      .updatePlaylist(this.playlist_id!, updatedPlaylist)
      .subscribe({
        next: () => {
          console.log('Song removed from playlist successfully');
          this.currentPlaylist.set(updatedPlaylist);
        },
        error: (err) => {
          console.error('Error removing song from playlist:', err);
        },
      });
  }

  goBackLouange() {
    this.router.navigate(['louange']);
  }

  openSongRead(songId: string, isExtra: boolean) {
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
