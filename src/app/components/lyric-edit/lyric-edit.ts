import {
  Component,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
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
import { LyricsService } from '../../services/lyrics/lyrics.service';
import { Lyricsfb } from '../../services/lyrics/lyricsfb.service';
import { environment } from '../../../environments/environment.prod';
import { ExtralyricsService } from '../../services/extra/extralyrics.service';
import { ExtrafbService } from '../../services/extra/extrafb.service';
import { BehaviorSubject, filter, pairwise } from 'rxjs';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  DragDropModule,
} from '@angular/cdk/drag-drop';

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
    DragDropModule,
  ],
  templateUrl: './lyric-edit.html',
  styleUrl: './lyric-edit.css',
})
export class LyricEdit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  // Fihirana CEIM
  lyricsSig = inject(LyricsService).lyricsSig;
  lyricsService = inject(LyricsService);
  lyricsFb = inject(Lyricsfb);

  // Fihirana extra
  extraLyricsSig = inject(ExtralyricsService).extraLyricSig;
  extraLyricsService = inject(ExtralyricsService);
  extraLyricsFb = inject(ExtrafbService);

  private router = inject(Router);

  id = this.route.snapshot.paramMap.get('id');
  extra = this.route.snapshot.url.some((segment) =>
    segment.path.includes('extralyric')
  );

  form: FormGroup = this.fb.group({
    songNumber: [null],
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

  // Signal to track section order and state
  sectionsSignal: WritableSignal<any[]> = signal([]);

  sectionStream$ = new BehaviorSubject(this.sections);
  private hasDifference(a: any[], b: any[]): boolean {
    return JSON.stringify(a) !== JSON.stringify(b);
  }

  constructor() {
    if (this.id && this.id !== 'new') {
      let currentLyrics: Signal<LyricInterface[]>;
      if (!this.extra) {
        currentLyrics = this.lyricsSig;
      } else {
        currentLyrics = this.extraLyricsSig;
      }

      const lyric = currentLyrics().find((l) => l.id === this.id);
      if (lyric) {
        this.form.patchValue({
          songNumber: lyric.songNumber || 0,
          suffix: lyric.suffix || '', // Optional suffix
          title: lyric.title,
          searchTitle: lyric.searchTitle,
          allLyricsText: lyric.allLyricsText,
          key: lyric.key,
        });
        // Add sections to the form array
        this.sections.clear();
        lyric.sections.forEach((s) => this.addSection(s));
        // Initialize the signal with the sections
        this.sectionsSignal.set([...lyric.sections]);
      }
    } else {
      this.form.patchValue({
        songNumber: 0, // Default song number
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
      }); // Initialize signal with default sections
      this.sectionsSignal.set(
        this.sectionTypes.map((type) => ({
          type,
          order: null,
          subtitle: '',
          lines: '',
        }))
      );
    }
    console.log('extra:', this.extra);

    this.sectionStream$.subscribe((newList) => {
      console.log('Done list actually changed! ', newList);
      this.sections.setValue(newList.getRawValue());
    });
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

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      // Reorder controls in the FormArray
      moveItemInArray(
        this.sections.controls,
        event.previousIndex,
        event.currentIndex
      );

      // Update the signal with the new order from FormArray
      const reorderedSections = this.sections.controls.map(
        (ctrl) => ctrl.value
      );
      this.sectionsSignal.set(reorderedSections);
    } else {
      transferArrayItem(
        (event.previousContainer as any).data,
        this.sections.controls,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  save() {
    const formValue = this.form.value;
    // Use the signal's section state instead of form array
    const sectionsData = this.sectionsSignal().map((s: any) => ({
      type: s.type,
      order: s.order,
      subtitle: s.subtitle,
      lines: Array.isArray(s.lines) ? s.lines : s.lines.split('\n'),
    }));

    const lyric: LyricInterface = {
      ...formValue,
      searchTitle: formValue.title.toLowerCase(),
      allLyricsText: sectionsData
        .map((s: any) => {
          const lines = Array.isArray(s.lines) ? s.lines : s.lines.split('\n');
          return lines.join('\n');
        })
        .join('\n'),
      sections: sectionsData,
      updatedAt: new Date(),
    };

    if (this.id && this.id !== 'new') {
      if (!this.extra) {
        this.lyricsFb.updateLyric(this.id, lyric).subscribe(() => {
          this.lyricsService.updateLyric({ ...lyric });
        });
      } else {
        this.extraLyricsFb.updateLyric(this.id, lyric).subscribe(() => {
          this.extraLyricsService.updateExtraLyric({ ...lyric });
        });
      }

      this.goBack();
    } else {
      if (!this.extra) {
        this.lyricsFb
          .addLyric(lyric)
          .subscribe(() => this.lyricsService.addLyric(lyric));
      } else {
        this.extraLyricsFb
          .addExtraLyric(lyric)
          .subscribe(() => this.extraLyricsService.addExtraLyric(lyric));
      }

      this.goBack();
    }
  }

  goBack() {
    this.router.navigate([environment.adminLink]);
  }
}
