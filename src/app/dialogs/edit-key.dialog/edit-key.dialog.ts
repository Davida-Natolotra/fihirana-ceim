import { Component, inject, OnInit } from '@angular/core';
import { LyricInterface } from '../../models/lyric.interface';
import { ExtraLyricInterface } from '../../models/extra-lyric.interface';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SongService } from '../../services/song/song.service';
import { MatButtonModule, MatIconButton } from '@angular/material/button';

@Component({
  selector: 'app-edit-key.dialog',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatIconButton,
    MatButtonModule,
  ],
  templateUrl: './edit-key.dialog.html',
  styleUrl: './edit-key.dialog.css',
})
export class EditKeyDialog implements OnInit {
  data: LyricInterface | ExtraLyricInterface = inject(MAT_DIALOG_DATA);
  songService = inject(SongService);
  dialogRef = inject(MatDialogRef<EditKeyDialog>);

  fb = inject(FormBuilder);
  form = this.fb.group({
    clef: ['', [Validators.minLength(2), Validators.required]],
  });

  ngOnInit() {
    this.form.patchValue({ clef: this.data?.key || '' });
  }

  submit() {
    if (this.form.valid) {
      const newKey = this.form.get('clef')?.value;
      this.songService.updateSong({
        songId: this.data?.id || '',
        data: {
          ...this.data,
          key: newKey || '',
        },
        isExtra: this.songService.songIsExtra(),
      });
      this.dialogRef.close(newKey);
    }
  }

  resetValues() {
    this.form.reset();
  }
}
