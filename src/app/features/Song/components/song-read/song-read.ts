import {ChangeDetectionStrategy, Component, inject, OnInit, signal, WritableSignal,} from '@angular/core';
import {Song} from '../../../Playlist/models/playlist.interface';
import {PlaylistsService} from '../../../Playlist/state/playlists/playlists.service';
import {PlaylistsfbService} from '../../../Playlist/api/playlistfb/playlistsfb.service';
import {SongService} from '../../state/song/song.service';
import {ActivatedRoute} from '@angular/router';
import {Lyric} from '../../../Lyrics/components/lyric/lyric';
import {MatFabButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {LyricInterface} from '../../../Lyrics/models/lyric.interface';
import {ExtraLyricInterface} from '../../../Lyrics/models/extra-lyric.interface';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {EditKeyDialog} from '../edit-key.dialog/edit-key.dialog';
import {SongfbApi} from '../../api/songfb/songfb.api';

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
  songApi = inject(SongfbApi)
  readonly dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  id = this.route.snapshot.paramMap.get('id');
  extra = this.route.snapshot.url.some((segment) =>
    segment.path.includes('extralyric')
  );

  ngOnInit(): void {
    if (this.id) {
      this.songApi
        .fetchSong({songId: this.id, isExtra: this.extra})
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
