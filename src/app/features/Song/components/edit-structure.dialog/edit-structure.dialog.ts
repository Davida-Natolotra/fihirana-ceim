import {Component, inject, ViewChild} from '@angular/core';
import {LyricInterface} from '../../../Lyrics/models/lyric.interface';
import {ExtraLyricInterface} from '../../../Lyrics/models/extra-lyric.interface';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef,} from '@angular/material/dialog';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {SongService} from '../../state/song/song.service';
import {MatButtonModule} from '@angular/material/button';
import {SongfbApi} from '../../api/songfb/songfb.api';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';

@Component({
  selector: 'app-edit-structure.dialog',
  imports: [ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,],
  templateUrl: './edit-structure.dialog.html',
  styleUrl: './edit-structure.dialog.css'
})
export class EditStructureDialog {
  data: LyricInterface | ExtraLyricInterface = inject(MAT_DIALOG_DATA);
  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  songService = inject(SongService);
  songApi = inject(SongfbApi)
  dialogRef = inject(MatDialogRef<EditStructureDialog>);

  fb = inject(FormBuilder);
  form = this.fb.group({
    structure: ['', [Validators.required]],
  });

  ngOnInit() {
    const structureText = this.data?.structure || '';
    this.form.patchValue({structure: structureText});
  }

  submit() {
    if (this.form.valid) {
      const structure: string = this.form.get('structure')?.value || '';
      this.songApi.updateSong({
        songId: this.data?.id || '',
        data: {
          ...this.data,
          structure: structure,
        },
        isExtra: this.songService.songIsExtra(),
      });
      this.dialogRef.close(structure);
    }
  }

  resetValues() {
    this.form.reset();
  }
}
