import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Song } from '../../models/playlist.interface';
import { PlaylistsService } from '../../services/playlists/playlists.service';
import { PlaylistsfbService } from '../../services/playlists/playlistsfb.service';
import { SongService } from '../../services/song/song.service';
import { ActivatedRoute } from '@angular/router';
import { Lyric } from '../lyric/lyric';
import { MatFabButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LyricInterface } from '../../models/lyric.interface';
import { ExtraLyricInterface } from '../../models/extra-lyric.interface';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EditKeyDialog } from '../../dialogs/edit-key.dialog/edit-key.dialog';

@Component({
  selector: 'app-song-read',
  imports: [Lyric, MatIconModule, MatDialogModule, MatFabButton],
  templateUrl: './song-read.html',
  styleUrl: './song-read.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongRead implements OnInit {
  currentSong: WritableSignal<Song | any> = signal({});
  currentPlaylist = inject(PlaylistsService).currentPlaylist;
  playlistFbService = inject(PlaylistsfbService);
  songService = inject(SongService);
  readonly dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id');
  extra = this.route.snapshot.url.some((segment) =>
    segment.path.includes('extralyric')
  );

  ngOnInit(): void {
    if (this.id) {
      this.songService
        .fetchSong({ songId: this.id, isExtra: this.extra })
        .subscribe((song) => {
          this.currentSong.set(song);
        });
      this.songService.setSongExtra(this.extra);
    }
  }

  editKeyDialog() {
    this.dialog.open(EditKeyDialog, {
      data: this.currentSong() as LyricInterface | ExtraLyricInterface,
    });
  }
}
