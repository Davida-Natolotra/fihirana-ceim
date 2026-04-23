import {Component, Input} from '@angular/core';
import {LyricInterface} from '../../models/lyric.interface';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-lyric',
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    NgClass,
  ],
  templateUrl: './lyric.html',
  styleUrl: './lyric.css',
})
export class Lyric {
  @Input({required: true}) lyric!: LyricInterface;
  @Input({required: true}) extra!: boolean;
  @Input({required: true}) louange!: boolean;
  @Input({required: true}) carder!: boolean;

  getHeightLine(line: string): boolean {
    // Check if it's a mobile screen (typically 768px or less)
    const isMobile = window.innerWidth <= 768;

    if (isMobile && line.length > 30) {
      return true
    } else {
      return false;
    }
  }
}
