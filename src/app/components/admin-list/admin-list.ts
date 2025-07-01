import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';

import { MatTableDataSource } from '@angular/material/table';
import { LyricInterface } from '../../models/lyric.interface';
import { Router, RouterModule } from '@angular/router';
import { LyricsService } from '../../services/lyrics.service';
import { Lyricsfb } from '../../services/lyricsfb.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogDelete } from '../confirm-dialog-delete/confirm-dialog-delete';
import { environment } from '../../../environments/environment.prod';
@Component({
  selector: 'app-admin-list',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterModule,
    MatMenuModule,
    CommonModule,
    MatPaginatorModule,
  ],
  templateUrl: './admin-list.html',
  styleUrl: './admin-list.css',
})
export class AdminList implements OnInit, AfterViewInit {
  lyricService = inject(LyricsService);
  lyricsFirebaseService = inject(Lyricsfb);
  displayedColumns: string[] = ['songNumber', 'title', 'actions'];
  router = inject(Router);
  dataSource = new MatTableDataSource<LyricInterface>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();

  constructor(private cdr: ChangeDetectorRef, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.lyricsFirebaseService
      .getLyrics()
      .subscribe((lyrics: LyricInterface[]) => {
        // Update the lyrics signal with the fetched data
        this.lyricService.lyricsSig.set(lyrics);
        // Update the data source for the table
        this.dataSource.data = lyrics;
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

  editLyric(id?: string) {
    if (!id) return;

    this.router.navigate([environment.adminLink + '/lyric', id]);
  }

  deleteLyric(id?: string) {
    const dialogRef = this.dialog.open(ConfirmDialogDelete);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (!id) return;
        this.lyricsFirebaseService.removeLyric(id).subscribe(() => {
          // Optionally, you can show a success message or refresh the list
          this.lyricService.lyricsSig.update((lyrics) =>
            lyrics.filter((lyric) => lyric.id !== id)
          );
        });
      }
    });
  }
  newLyric() {
    this.router.navigate([environment.adminLink + '/lyric', 'new']);
  }
}
