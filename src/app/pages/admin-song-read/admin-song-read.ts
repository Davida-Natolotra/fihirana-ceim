import { Component, inject } from '@angular/core';
import { PlaylistsService } from '../../services/playlists/playlists.service';
import { Router } from '@angular/router';
import { MatButtonModule, MatAnchor } from '@angular/material/button';
import { SongRead } from '../../components/song-read/song-read';

@Component({
  selector: 'app-admin-song-read',
  imports: [SongRead, MatButtonModule, MatAnchor],
  templateUrl: './admin-song-read.html',
  styleUrl: './admin-song-read.css',
})
export class AdminSongRead {
  private router = inject(Router);
  currentPlaylist = inject(PlaylistsService).currentPlaylist;
  goBack() {
    this.router.navigate(['playlist-edit', this.currentPlaylist()!.id]);
  }
}
