import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { LyricInterface } from '../../models/lyric.interface';
import { LyricsService } from '../../services/lyrics.service';
@Component({
  selector: 'app-lists',
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
  ],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
})
export class Lists implements AfterViewInit {
  router = inject(Router);
  displayedColumns: string[] = ['songNumber', 'title'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  lyricService = inject(LyricsService);

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDetail(row: LyricInterface) {
    this.router.navigate(['/lyric', row.id]);
  }

  constructor() {
    // Initialize the lyrics signal with sample data if it exists
    if (this.lyricService.lyricsSig?.set) {
      this.lyricService.lyricsSig.set(ELEMENT_DATA);
    }
  }
}

const ELEMENT_DATA: LyricInterface[] = [
  {
    id: '1',
    songNumber: 1,
    title: 'Song One',
    searchTitle: 'song one',
    allLyricsText: 'Lyrics of song one',
    sections: [
      {
        type: 'verse',
        order: 1,
        subtitle: 'Verse 1',
        lines: ['Line 1 of verse 1', 'Line 2 of verse 1'],
      },
      {
        type: 'chorus',
        order: 2,
        subtitle: 'Chorus',
        lines: ['Line 1 of chorus', 'Line 2 of chorus'],
      },
      {
        type: 'verse',
        order: 1,
        subtitle: 'Verse 2',
        lines: ['Line 1 of verse 1', 'Line 2 of verse 1'],
      },
    ],
    tags: ['tag1', 'tag2'],
    language: 'English',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    songNumber: 2,
    title: 'Song Two',
    searchTitle: 'song two',
    allLyricsText: 'Lyrics of song two',
    sections: [
      {
        type: 'verse',
        order: 1,
        subtitle: 'Verse 1',
        lines: ['Line 1 of verse 1', 'Line 2 of verse 1'],
      },
      {
        type: 'chorus',
        order: 2,
        subtitle: 'Chorus',
        lines: ['Line 1 of chorus', 'Line 2 of chorus'],
      },
      {
        type: 'bridge',
        order: 3,
        subtitle: 'Bridge',
        lines: ['Line 1 of bridge'],
      },
    ],
    tags: ['tag3', 'tag4'],
    language: 'English',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
