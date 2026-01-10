import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormsModule, isFormControl, ReactiveFormsModule, Validators,} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {PlaylistsfbService} from '../../services/playlists/playlistsfb.service';
import {MatIcon} from '@angular/material/icon';
import {PlaylistInterface} from '../../models/playlist.interface';

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
export class PlaylistCreateDialog implements OnInit {
  fb = inject(FormBuilder);
  playlistFbService = inject(PlaylistsfbService);
  dialogRef = inject(MatDialogRef<PlaylistCreateDialog>);
  form = this.fb.group({
    name: ['', [Validators.minLength(3), Validators.required]],
  });
  data: { isEdit: boolean, playlist: PlaylistInterface | null } = inject(MAT_DIALOG_DATA);
  cdr = inject(ChangeDetectorRef);
  protected readonly isFormControl = isFormControl;

  ngOnInit() {
    this.form.patchValue({name: this.data.isEdit ? this.data.playlist?.name : ''});
  }

  submit() {
    if (this.form.valid) {
      const playlistName = this.form.get('name')?.value;
      if (this.data.isEdit) {
        this.playlistFbService.updatePlaylist(
          this.data.playlist!.id,
          {...this.data.playlist, name: playlistName} as PlaylistInterface
        ).subscribe(() => {
          this.dialogRef.close();
          this.cdr.markForCheck();
        });
      } else {
        this.playlistFbService
          .addPlaylist({
            id: crypto.randomUUID(),
            name: playlistName,
          } as PlaylistInterface)
          .subscribe(() => {
            this.dialogRef.close();
            this.cdr.markForCheck();
          });
      }
    }
  }

  resetValues() {
    this.form.reset();
  }
}
