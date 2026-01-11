import {AfterViewInit, ChangeDetectorRef, Component, inject, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {Router, RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {ExtraLyricInterface} from '../../models/extra-lyric.interface';
import {ExtralyricsService} from '../../services/extra/extralyrics.service';
import {ExtrafbService} from '../../services/extra/extrafb.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-extra-lists',
  imports: [
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    RouterModule,
    MatButtonModule, MatProgressSpinnerModule, CommonModule
  ],
  templateUrl: './extra-lists.html',
  styleUrl: './extra-lists.css',
})
export class ExtraLists implements OnInit, AfterViewInit {
  router = inject(Router);
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns: string[] = ['title'];
  dataSource = new MatTableDataSource([] as ExtraLyricInterface[]);
  extraLyricService = inject(ExtralyricsService);
  extraLyricsFirebaseService = inject(ExtrafbService);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();
  isLoading: boolean = true;

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.extraLyricsFirebaseService
      .getExtraLyrics()
      .subscribe((lyrics: ExtraLyricInterface[]) => {
        // Update the lyrics signal with the fetched data

        this.extraLyricService.loadExtraLyric(lyrics);
        // Update the data source for the table
        this.dataSource.data = lyrics;
        this.isLoading = false;
        // Re-initialize sort and paginator after data loads
        this.cdr.detectChanges();
      });
    // Initialize the data source with the lyrics signal
    this.dataSource.data = this.extraLyricService.extraLyricSig();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort.active = 'title'; // or any other column you want to sort by
    this.sort.direction = 'asc'; // or 'desc'
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDetail(row: ExtraLyricInterface) {
    this.router.navigate(['/extralyric', row.id]);
  }
}
