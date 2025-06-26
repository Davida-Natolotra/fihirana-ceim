import { Component, Input } from '@angular/core';
import { LyricInterface } from '../../models/lyric.interface';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-lyric',
  imports: [
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
  ],
  templateUrl: './lyric.html',
  styleUrl: './lyric.css',
})
export class Lyric {
  @Input({ required: true }) lyric!: LyricInterface;
}
