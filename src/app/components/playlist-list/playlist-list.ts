import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  Input,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PlaylistInterface } from '../../models/playlist.interface';
import { PlaylistsfbService } from '../../services/playlists/playlistsfb.service';
import { PlaylistsService } from '../../services/playlists/playlists.service';
import { environment } from '../../../environments/environment.development';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PlaylistCreateDialog } from '../../dialogs/playlist-create-dialog/playlist-create-dialog';
import { DeletePlaylistDialog } from '../../dialogs/delete-playlist-dialog/delete-playlist-dialog';

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
    MatDialogModule,
  ],
  templateUrl: './playlist-list.html',
  styleUrl: './playlist-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistList {
  router = inject(Router);
  route = inject(ActivatedRoute);
  displayedColumns: string[] = ['name', 'action'];
  dataSource = new MatTableDataSource([] as PlaylistInterface[]);
  playlistService = inject(PlaylistsService);
  playlistsFirebaseService = inject(PlaylistsfbService);
  readonly dialog = inject(MatDialog);
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator = new MatPaginator();
  @Input() isAdmin: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  openDialog() {
    this.dialog.open(PlaylistCreateDialog, {
      data: { isEdit: false, playlist: null },
    });
  }

  deleteDialog(data: PlaylistInterface) {
    this.dialog.open(DeletePlaylistDialog, { data });
  }

  editPlaylistDialog(data: PlaylistInterface) {
    this.dialog.open(PlaylistCreateDialog, {
      data: { isEdit: true, playlist: data },
    });
  }

  ngOnInit(): void {
    this.playlistsFirebaseService
      .getPlaylists()
      .subscribe((playlists: PlaylistInterface[] | any) => {
        // Update the lyrics signal with the fetched data

        this.playlistService.setPlaylists(playlists as PlaylistInterface[]);

        // Update the data source for the table
        this.dataSource.data = playlists.filter(
          (p: PlaylistInterface) => !p.isRemoved
        );
      });
    // Initialize the data source with the lyrics signal
    this.dataSource.data = this.playlistService
      .playlistsSig()
      .filter((p: PlaylistInterface) => !p.isRemoved);
  }

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

  openPlaylist(row: PlaylistInterface) {
    this.playlistService.setIsPlaylist(true);
    this.playlistService.setIsEditingPlaylist(false);
    this.playlistService.setCurrentPlaylist(row);
    console.log('current playlist:', this.playlistService.currentPlaylist());
    if (
      this.route.snapshot.url.some((segment) =>
        segment.path.includes(environment.adminLink)
      )
    ) {
      this.router.navigate(['/playlist-edit', row.id]);
      return;
    } else {
      this.router.navigate(['/playlist', row.id]);
    }
  }

  deletePlaylist(element: PlaylistInterface) {
    this.deleteDialog(element);
    // TODO: Implement delete functionality
  }
}
