import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { PlaylistsfbService } from '../../services/playlists/playlistsfb.service';
import { PlaylistInterface } from '../../models/playlist.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-playlist-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './delete-playlist-dialog.html',
  styleUrl: './delete-playlist-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeletePlaylistDialog {
  data: PlaylistInterface = inject(MAT_DIALOG_DATA);

  playlistFbService = inject(PlaylistsfbService);
  dialogRef = inject(MatDialogRef<DeletePlaylistDialog>);

  confirmDelete(id: string) {
    this.playlistFbService.removePlaylist(id).subscribe(() => {
      this.dialogRef.close();
    });
  }
}
