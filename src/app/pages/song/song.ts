import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PlaylistsService } from '../../services/playlists/playlists.service';
import { SongRead } from '../../components/song-read/song-read';
import { MatAnchor, MatButtonModule } from '@angular/material/button';
import { SongService } from '../../services/song/song.service';

@Component({
  selector: 'app-song',
  imports: [SongRead, MatButtonModule, MatAnchor],
  templateUrl: './song.html',
  styleUrl: './song.css',
})
export class Song {
  currentPlaylist = inject(PlaylistsService).currentPlaylist;
  songService = inject(SongService);
  private router = inject(Router);

  goBack() {
    if (this.songService.songIsAdmin()) {
      this.router.navigate(['playlist-edit', this.currentPlaylist()!.id]);
    } else {
      this.router.navigate(['playlist', this.currentPlaylist()!.id]);
    }
  }
}
