import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router, RouterModule } from '@angular/router';
import { LyricInterface } from '../../models/lyric.interface';
import { LyricsService } from '../../services/lyrics/lyrics.service';
import { Lyricsfb } from '../../services/lyrics/lyricsfb.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-lists',
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    RouterModule,
    MatButtonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
})
export class Lists implements OnInit, AfterViewInit {
  router = inject(Router);
  displayedColumns: string[] = ['songNumber', 'title'];
  dataSource = new MatTableDataSource([] as LyricInterface[]);
  lyricService = inject(LyricsService);
  lyricsFirebaseService = inject(Lyricsfb);
  @ViewChild(MatSort) sort!: MatSort;
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();
  isLoading: boolean = true;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.lyricsFirebaseService
      .getLyrics()
      .subscribe((lyrics: LyricInterface[]) => {
        // Update the lyrics signal with the fetched data
        this.lyricService.lyricsSig.set(lyrics);
        // Update the data source for the table
        this.dataSource.data = lyrics;
        this.isLoading = false;
      });
    // Initialize the data source with the lyrics signal
    this.dataSource.data = this.lyricService.lyricsSig();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort.active = 'songNumber'; // or any other column you want to sort by
    this.sort.direction = 'asc'; // or 'desc'
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDetail(row: LyricInterface) {
    this.router.navigate(['/lyric', row.id]);
  }

  // constructor() {
  //   // Initialize the lyrics signal with sample data if it exists
  //   if (this.lyricService.lyricsSig?.set) {
  //     this.lyricService.lyricsSig.set(ELEMENT_DATA);
  //   }
  // }
}
