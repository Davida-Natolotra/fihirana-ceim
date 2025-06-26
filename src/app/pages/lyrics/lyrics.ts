import { Component, inject, OnInit } from '@angular/core';
import { Lyric } from '../../components/lyric/lyric';
import { LyricInterface } from '../../models/lyric.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { LyricsService } from '../../services/lyrics.service';

@Component({
  selector: 'app-lyrics',
  imports: [Lyric, MatButton],
  templateUrl: './lyrics.html',
  styleUrl: './lyrics.css',
})
export class Lyrics implements OnInit {
  router = inject(Router);
  id!: number;
  item!: LyricInterface;
  route = inject(ActivatedRoute);
  LyricService = inject(LyricsService);
  dataSource = this.LyricService.lyricsSig() as LyricInterface[];
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.dataSource.find((item) => Number(item.id) === this.id);
    if (found) {
      this.item = found as LyricInterface;
    } else {
      // Handle the case where the item is not found, e.g., assign a default Lyric or throw an error
      this.item = {} as LyricInterface;
    }
  }
  goBack() {
    this.router.navigate(['']);
  }
}
