import { Component, Input } from '@angular/core';
import {
  AfterViewInit,
  ChangeDetectorRef,
  inject,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RouterModule } from '@angular/router';
import { LyricInterface } from '../../models/lyric.interface';
import { ExtraLyricInterface } from '../../models/extra-lyric.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PlaylistsfbService } from '../../services/playlists/playlistsfb.service';
import { PlaylistsService } from '../../services/playlists/playlists.service';
import { Song } from '../../models/playlist.interface';

@Component({
  selector: 'app-drag-lists',
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './drag-lists.html',
  styleUrl: './drag-lists.css',
})
export class DragLists implements AfterViewInit {
  @Input() lyrics: LyricInterface[] | ExtraLyricInterface[] = [];
  @Input() isExtra: boolean = false;
  dataSource = new MatTableDataSource([] as LyricInterface[]);
  displayedColumns: string[] = ['songNumber', 'title', 'add'];
  playlistFbService = inject(PlaylistsfbService);
  currentPlaylist = inject(PlaylistsService).currentPlaylist;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.dataSource.data = this.lyrics;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort.active = 'songNumber';
    this.sort.direction = 'asc';
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addLyric(
    lyric: LyricInterface | ExtraLyricInterface,
    isExtra: boolean = this.isExtra
  ) {
    console.log('Adding lyric:', lyric);
    const songAdd: Song = {
      title: lyric.title,
      key: lyric.key,
      id: lyric?.id || '',
      isExtra: isExtra,
    };

    this.playlistFbService
      .updatePlaylist(this.currentPlaylist()!.id || '', {
        ...this.currentPlaylist(),
        songs: [...(this.currentPlaylist()!.songs || []), songAdd],
      } as any)
      .subscribe({
        next: () => {
          console.log('Lyric added to playlist successfully');
        },
        error: (error) => {
          console.error('Error adding lyric to playlist:', error);
        },
      });
    // TODO: Implement add functionality
  }
}
