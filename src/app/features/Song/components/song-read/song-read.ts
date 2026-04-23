import {ChangeDetectionStrategy, Component, inject, OnInit,} from '@angular/core';

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
import {EditStructureDialog} from '../edit-structure.dialog/edit-structure.dialog';
import {SongfbApi} from '../../api/songfb/songfb.api';
import {TitleState} from '../../../appbar/state/title.state';

@Component({
  selector: 'app-song-read',
  imports: [Lyric, MatIconModule, MatDialogModule, MatFabButton],
  templateUrl: './song-read.html',
  styleUrl: './song-read.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongRead implements OnInit {

  currentPlaylist = inject(PlaylistsService).currentPlaylist;
  playlistFbService = inject(PlaylistsfbService);
  songService = inject(SongService);
  songApi = inject(SongfbApi)
  readonly dialog = inject(MatDialog);
  appTitle = inject(TitleState)
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
          this.songService.setCurrentSong(song);
          this.appTitle.setAppTitle(song.title)
        });
      this.songService.setSongExtra(this.extra);
    }
  }

  editKeyDialog() {
    this.dialog.open(EditKeyDialog, {
      data: this.songService.currentSong() as LyricInterface | ExtraLyricInterface,
    });
  }

  editStructureDialog() {
    this.dialog.open(EditStructureDialog, {
      data: this.songService.currentSong() as LyricInterface | ExtraLyricInterface,
    });
  }
}
