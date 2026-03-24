import {Component, inject} from '@angular/core';
import {PlaylistsService} from '../../../features/Playlist/state/playlists/playlists.service';
import {Router} from '@angular/router';
import {MatAnchor, MatButtonModule} from '@angular/material/button';
import {SongRead} from '../../../features/Song/components/song-read/song-read';

@Component({
  selector: 'app-admin-song-read',
  imports: [SongRead, MatButtonModule, MatAnchor],
  templateUrl: './admin-song-read.html',
  styleUrl: './admin-song-read.css',
})
export class AdminSongRead {
  currentPlaylist = inject(PlaylistsService).currentPlaylist;
  private router = inject(Router);

  goBack() {
    this.router.navigate(['playlist-edit', this.currentPlaylist()!.id]);
  }
}
