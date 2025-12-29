import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PlaylistInterface } from '../../models/playlist.interface';
import { PlaylistsfbService } from '../../services/playlists/playlistsfb.service';
import { PlaylistsService } from '../../services/playlists/playlists.service';

@Component({
  selector: 'app-playlist-list',
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
  templateUrl: './playlist-list.html',
  styleUrl: './playlist-list.css',
})
export class PlaylistList {
  router = inject(Router);
  displayedColumns: string[] = ['name'];
  dataSource = new MatTableDataSource([] as PlaylistInterface[]);
  playlistService = inject(PlaylistsService);
  playlistsFirebaseService = inject(PlaylistsfbService);

  @ViewChild(MatSort) sort!: MatSort;
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.playlistsFirebaseService
      .getPlaylists()
      .subscribe((playlists: PlaylistInterface[] | any) => {
        // Update the lyrics signal with the fetched data

        this.playlistService.setPlaylists(playlists as PlaylistInterface[]);
        console.log('Playlist: ', playlists);
        // Update the data source for the table
        this.dataSource.data = playlists;
      });
    // Initialize the data source with the lyrics signal
    this.dataSource.data = this.playlistService.playlistsSig();
  }

  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.sort.active = 'name'; // or any other column you want to sort by
    this.sort.direction = 'asc'; // or 'desc'
    this.dataSource.sort = this.sort;
    this.cdr.detectChanges();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openLyric(row: PlaylistInterface) {
    this.router.navigate(['/extralyric', row.id]);
  }
}
