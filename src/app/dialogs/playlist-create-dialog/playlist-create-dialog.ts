import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormsModule,
  isFormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PlaylistsfbService } from '../../services/playlists/playlistsfb.service';
import { MatIcon } from '@angular/material/icon';
import { PlaylistInterface } from '../../models/playlist.interface';

@Component({
  selector: 'app-playlist-create-dialog',
  imports: [
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatIcon,
  ],
  templateUrl: './playlist-create-dialog.html',
  styleUrl: './playlist-create-dialog.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaylistCreateDialog {
  fb = inject(FormBuilder);
  playlistFbService = inject(PlaylistsfbService);
  dialogRef = inject(MatDialogRef<PlaylistCreateDialog>);
  form = this.fb.group({
    name: ['', [Validators.minLength(3), Validators.required]],
  });
  protected readonly isFormControl = isFormControl;

  submit() {
    if (this.form.valid) {
      const playlistName = this.form.get('name')?.value;
      this.playlistFbService
        .addPlaylist({
          id: crypto.randomUUID(),
          name: playlistName,
        } as PlaylistInterface)
        .subscribe(() => {
          this.dialogRef.close();
        });
    }
  }

  resetValues() {
    this.form.reset();
  }
}
