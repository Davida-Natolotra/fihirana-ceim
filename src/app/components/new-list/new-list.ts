import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
  Type,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { Router, RouterModule } from '@angular/router';
import { LyricInterface } from '../../models/lyric.interface';
import { LyricsService } from '../../services/lyrics/lyrics.service';
import { Lyricsfb } from '../../services/lyrics/lyricsfb.service';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-new-list',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    ScrollingModule,
    MatListModule,
    FormsModule,
    MatMenuModule,
  ],
  templateUrl: './new-list.html',
  styleUrl: './new-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewList implements OnInit, AfterViewInit {
  router = inject(Router);
  displayedColumns: string[] = ['songNumber', 'title'];
  dataSource: LyricInterface[] = [];
  lyricService = inject(LyricsService);
  lyricsFirebaseService = inject(Lyricsfb);
  searchValue = '';
  searchMenu = signal('');
  searchResult = signal(0);
  isLoading: boolean = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.lyricsFirebaseService
      .getLyrics()
      .subscribe((lyrics: LyricInterface[]) => {
        // Update the lyrics signal with the fetched data
        this.lyricService.lyricsSig.set(lyrics);
        // Update the data source for the table with proper sorting
        this.dataSource = this.sortLyrics(lyrics);
        this.isLoading = false;
        this.cdr.detectChanges();
      });
    // Initialize the data source with the lyrics signal and proper sorting
    this.dataSource = this.sortLyrics(this.lyricService.lyricsSig());
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource = this.lyricService
      .lyricsSig()
      .filter((lyric) =>
        lyric.title.toLowerCase().includes(filterValue.trim().toLowerCase()),
      );
    this.searchResult.set(this.dataSource.length);
  }

  applyFilterNumber(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource = this.lyricService
      .lyricsSig()
      .filter((lyric) => lyric.songNumber == Number(filterValue));
    this.searchResult.set(this.dataSource.length);
  }
  applyFilterLyric(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource = this.lyricService
      .lyricsSig()
      .filter((lyric) =>
        lyric.allLyricsText
          ?.toLowerCase()
          .includes(filterValue.trim().toLowerCase()),
      );
    this.searchResult.set(this.dataSource.length);
  }

  setSearchMenu(text: string) {
    this.clearFilter();
    this.searchMenu.set(text);
  }

  clearFilter() {
    this.searchValue = '';
    this.dataSource = this.sortLyrics(this.lyricService.lyricsSig());
  }

  clearMenuFilter() {
    this.searchResult.set(0);
    this.setSearchMenu('');
  }

  openDetail(row: LyricInterface) {
    this.router.navigate(['/lyric', row.id]);
  }

  private sortLyrics(lyrics: LyricInterface[]): LyricInterface[] {
    return lyrics.sort((a: LyricInterface, b: LyricInterface) => {
      // First, compare by songNumber
      const songNumberA = a.songNumber ?? 0;
      const songNumberB = b.songNumber ?? 0;

      if (songNumberA !== songNumberB) {
        return songNumberA - songNumberB;
      }

      // If songNumbers are equal, compare by suffix
      const suffixA = a.suffix ?? '';
      const suffixB = b.suffix ?? '';

      return suffixA.localeCompare(suffixB);
    });
  }
}
