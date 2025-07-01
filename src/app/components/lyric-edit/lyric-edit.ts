import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormArray,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LyricInterface, LyricSection } from '../../models/lyric.interface';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { LyricsService } from '../../services/lyrics.service';
import { Lyricsfb } from '../../services/lyricsfb.service';
import { environment } from '../../../environments/environment.prod';

@Component({
  selector: 'app-lyric-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
  ],
  templateUrl: './lyric-edit.html',
  styleUrl: './lyric-edit.css',
})
export class LyricEdit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  lyricsSig = inject(LyricsService).lyricsSig;
  lyricsService = inject(LyricsService);
  lyricsFb = inject(Lyricsfb);
  private router = inject(Router);

  id = this.route.snapshot.paramMap.get('id');
  form: FormGroup = this.fb.group({
    songNumber: [null, Validators.required],
    suffix: [''], // Optional suffix for the song number
    title: ['', Validators.required],
    searchTitle: [''],
    allLyricsText: [''],
    key: [''],
    tags: [''],
    language: [''],
    sections: this.fb.array([]),
  });

  get sections(): FormArray {
    return this.form.get('sections') as FormArray;
  }

  sectionTypes = [
    'verse',
    'chorus',
    'bridge',
    'intro',
    'outro',
    'pre-chorus',
    'tag',
  ];

  constructor() {
    if (this.id && this.id !== 'new') {
      const currentLyrics = this.lyricsSig();
      const lyric = currentLyrics.find((l) => l.id === this.id);
      if (lyric) {
        this.form.patchValue({
          songNumber: lyric.songNumber,
          suffix: lyric.suffix || '', // Optional suffix
          title: lyric.title,
          searchTitle: lyric.searchTitle,
          allLyricsText: lyric.allLyricsText,
          key: lyric.key,
        });
        // Add sections to the form array
        this.sections.clear();
        lyric.sections.forEach((s) => this.addSection(s));
      }
    } else {
      this.form.patchValue({
        songNumber: 1, // Default song number
        suffix: '', // Default suffix
        title: '',
        searchTitle: '',
        allLyricsText: '',
        key: '',
        tags: '',
        language: '',
        sections: this.sectionTypes.map((type) => ({
          type,
          order: null,
          subtitle: '',
          lines: '',
        })),
      });
    }
  }

  addSection(section?: LyricSection) {
    this.sections.push(
      this.fb.group({
        type: [section?.type || 'verse', Validators.required],
        order: [section?.order || null],
        subtitle: [section?.subtitle || ''],
        lines: [section?.lines?.join('\n') || '', Validators.required],
      })
    );
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
  }

  save() {
    const formValue = this.form.value;
    const lyric: LyricInterface = {
      ...formValue,
      searchTitle: formValue.title.toLowerCase(),
      allLyricsText: formValue.sections.map((s: any) => s.lines).join('\n'),
      sections: formValue.sections.map((s: any) => ({
        type: s.type,
        order: s.order,
        subtitle: s.subtitle,
        lines: s.lines.split('\n'),
      })),
      updatedAt: new Date(),
    };

    if (this.id && this.id !== 'new') {
      this.lyricsFb.updateLyric(this.id, lyric).subscribe(() => {
        this.lyricsService.updateLyric({ ...lyric });
      });

      this.goBack();
    } else {
      this.lyricsFb
        .addLyric(lyric)
        .subscribe(() => this.lyricsService.addLyric(lyric));

      this.goBack();
    }
  }

  goBack() {
    this.router.navigate([environment.adminLink]);
  }
}
