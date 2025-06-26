import { Component, inject, OnInit } from '@angular/core';
import { Lyric } from '../../components/lyric/lyric';
import { LyricInterface } from '../../models/lyric.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { LyricsService } from '../../services/lyrics.service';
import { Lyricsfb } from '../../services/lyricsfb.service';

@Component({
  selector: 'app-lyrics',
  imports: [Lyric, MatButton],
  templateUrl: './lyrics.html',
  styleUrl: './lyrics.css',
})
export class Lyrics implements OnInit {
  router = inject(Router);
  id!: string | null;
  item!: LyricInterface;
  route = inject(ActivatedRoute);
  LyricService = inject(LyricsService);
  LyricsFirebase = inject(Lyricsfb);
  dataSource = this.LyricService.lyricsSig() as LyricInterface[];

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    const found = this.dataSource.find((item) => item.id === this.id);
    if (found) {
      this.item = found as LyricInterface;
    } else {
      // Handle the case where the item is not found, e.g., assign a default Lyric or throw an error
      this.LyricsFirebase.getLyric(this.id!).subscribe(
        (lyric: LyricInterface) => {
          this.item = lyric;
        }
      );
    }
  }
  goBack() {
    this.router.navigate(['']);
  }
}
