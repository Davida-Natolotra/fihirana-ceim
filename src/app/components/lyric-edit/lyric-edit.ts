import {Component, inject, OnDestroy, signal, Signal, WritableSignal,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {LyricInterface, LyricSection} from '../../models/lyric.interface';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {LyricsService} from '../../services/lyrics/lyrics.service';
import {Lyricsfb} from '../../services/lyrics/lyricsfb.service';
import {environment} from '../../../environments/environment.prod';
import {ExtralyricsService} from '../../services/extra/extralyrics.service';
import {ExtrafbService} from '../../services/extra/extrafb.service';
import {BehaviorSubject, debounceTime, map, Observable, startWith, Subject, takeUntil} from 'rxjs';
import {CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

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
export class LyricEdit implements OnDestroy {
  // Services
  lyricsSig = inject(LyricsService).lyricsSig;
  lyricsService = inject(LyricsService);
  lyricsFb = inject(Lyricsfb);
  extraLyricsSig = inject(ExtralyricsService).extraLyricSig;
  extraLyricsService = inject(ExtralyricsService);
  extraLyricsFb = inject(ExtrafbService);
  sectionTypes = [
    'verse',
    'chorus',
    'bridge',
    'intro',
    'outro',
    'pre-chorus',
    'tag',
  ];
  // Signal only for local state tracking
  sectionsSignal: WritableSignal<any[]> = signal([]);
  private fb = inject(FormBuilder);
  form: FormGroup = this.fb.group({
    songNumber: [null],
    suffix: [''],
    title: ['', Validators.required],
    searchTitle: [''],
    allLyricsText: [''],
    key: [''],
    tags: [''],
    language: [''],
    sections: this.fb.array([]),
  });
  private route = inject(ActivatedRoute);
  // Route parameters
  id = this.route.snapshot.paramMap.get('id');
  extra = this.route.snapshot.url.some((segment) =>
    segment.path.includes('extralyric')
  );
  private router = inject(Router);
  private destroy$ = new Subject<void>();
  // RxJS streams for form sections management
  private sectionsFormArray$ = new BehaviorSubject<FormArray>(
    this.form.get('sections') as FormArray
  );
  sections$: Observable<FormArray> = this.sectionsFormArray$.asObservable();

  constructor() {
    this.initializeForm();
    this.setupSectionStream();
    this.setupFormValueChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addSection(section?: LyricSection) {
    const sectionsArray = this.form.get('sections') as FormArray;
    const newSection = this.fb.group({
      type: [section?.type || 'verse', Validators.required],
      order: [section?.order || null],
      subtitle: [section?.subtitle || ''],
      lines: [section?.lines?.join('\n') || '', Validators.required],
    });

    sectionsArray.push(newSection);
    this.sectionsFormArray$.next(sectionsArray);
    this.updateSectionsSignal();
  }

  removeSection(index: number) {
    const sectionsArray = this.form.get('sections') as FormArray;
    sectionsArray.removeAt(index);
    this.sectionsFormArray$.next(sectionsArray);
    this.updateSectionsSignal();
  }

  drop(event: CdkDragDrop<any>) {
    const sectionsArray = this.form.get('sections') as FormArray;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        sectionsArray.controls,
        event.previousIndex,
        event.currentIndex
      );

      this.sectionsFormArray$.next(sectionsArray);
      this.updateSectionsSignal();
    } else {
      transferArrayItem(
        (event.previousContainer as any).data,
        sectionsArray.controls,
        event.previousIndex,
        event.currentIndex
      );
      this.sectionsFormArray$.next(sectionsArray);
      this.updateSectionsSignal();
    }
  }

  save() {
    const formValue = this.form.value;
    const sectionsArray = this.form.get('sections') as FormArray;

    // Use the actual form data instead of signal data
    const sectionsData = sectionsArray.controls.map((control) => {
      const sectionValue = control.value;
      return {
        type: sectionValue.type,
        order: sectionValue.order,
        subtitle: sectionValue.subtitle,
        lines: Array.isArray(sectionValue.lines)
          ? sectionValue.lines
          : sectionValue.lines.split('\n'),
      };
    });

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
      this.updateLyric(lyric);
    } else {
      this.createLyric(lyric);
    }
  }

  goBack() {
    this.router.navigate([environment.adminLink]);
  }

  private initializeForm() {
    if (this.id && this.id !== 'new') {
      this.loadExistingLyric();
    } else {
      this.initializeNewLyric();
    }
  }

  private loadExistingLyric() {
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
        suffix: lyric.suffix || '',
        title: lyric.title,
        searchTitle: lyric.searchTitle,
        allLyricsText: lyric.allLyricsText,
        key: lyric.key,
      });

      const sectionsArray = this.form.get('sections') as FormArray;
      sectionsArray.clear();
      lyric.sections.forEach((s) => this.addSection(s));
      this.sectionsFormArray$.next(sectionsArray);
    }
  }

  private initializeNewLyric() {
    this.form.patchValue({
      songNumber: 0,
      suffix: '',
      title: '',
      searchTitle: '',
      allLyricsText: '',
      key: '',
      tags: '',
      language: '',
    });

    // Add initial sections for new lyrics using existing sectionTypes
    const initialTypes = this.sectionTypes.slice(0, 2) as ('verse' | 'chorus')[];
    initialTypes.forEach((type) => {
      this.addSection({
        type,
        order: 0,
        subtitle: '',
        lines: []
      });
    });
  }

  private setupSectionStream() {
    this.sections$
      .pipe(
        takeUntil(this.destroy$),
        map(formArray => formArray.getRawValue())
      )
      .subscribe((sections) => {
        console.log('Sections changed:', sections);
        this.sectionsSignal.set(sections);
      });
  }

  private setupFormValueChanges() {
    // Listen to form changes and update signal accordingly
    this.form.get('sections')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        startWith(this.form.get('sections')?.value),
        debounceTime(100)
      )
      .subscribe((sectionsValue) => {
        if (sectionsValue) {
          this.sectionsSignal.set(sectionsValue);
        }
      });
  }

  private updateSectionsSignal() {
    const sectionsArray = this.form.get('sections') as FormArray;
    const currentSections = sectionsArray.getRawValue();
    this.sectionsSignal.set(currentSections);
  }

  private updateLyric(lyric: LyricInterface) {
    const updateObservable = !this.extra
      ? this.lyricsFb.updateLyric(this.id!, lyric)
      : this.extraLyricsFb.updateLyric(this.id!, lyric);

    updateObservable
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.extra) {
          this.lyricsService.updateLyric({...lyric});
        } else {
          this.extraLyricsService.updateExtraLyric({...lyric});
        }
        this.goBack();
      });
  }

  private createLyric(lyric: LyricInterface) {
    const createObservable = !this.extra
      ? this.lyricsFb.addLyric(lyric)
      : this.extraLyricsFb.addExtraLyric(lyric);

    createObservable
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (!this.extra) {
          this.lyricsService.addLyric(lyric);
        } else {
          this.extraLyricsService.addExtraLyric(lyric);
        }
        this.goBack();
      });
  }
}
