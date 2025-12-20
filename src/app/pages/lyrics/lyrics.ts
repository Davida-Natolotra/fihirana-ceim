import { Component, inject, OnInit } from '@angular/core';
import { Lyric } from '../../components/lyric/lyric';
import { LyricInterface } from '../../models/lyric.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { LyricsService } from '../../services/lyrics.service';
import { Lyricsfb } from '../../services/lyricsfb.service';
import { ExtrafbService } from '../../services/extrafb.service';
import { ExtralyricsService } from '../../services/extralyrics.service';
import { ExtraLyricInterface } from '../../models/extra-lyric.interface';
import { LouangeService } from '../../services/louange.service';

@Component({
  selector: 'app-lyrics',
  imports: [Lyric, MatButton],
  templateUrl: './lyrics.html',
  styleUrl: './lyrics.css',
})
export class Lyrics implements OnInit {
  router = inject(Router);
  id!: string | null;
  louange = inject(LouangeService).louangeSig();
  item!: LyricInterface;
  route = inject(ActivatedRoute);
  LyricService = inject(LyricsService);
  LyricsFirebase = inject(Lyricsfb);
  extraLyricsFirebase = inject(ExtrafbService);
  extraLyricService = inject(ExtralyricsService);
  dataSource = [] as LyricInterface[] | ExtraLyricInterface[];
  extra = this.route.snapshot.url.some((segment) =>
    segment.path.includes('extralyric')
  );

  ngOnInit(): void {
    // const url = this.router.url;
    if (this.extra) {
      this.dataSource = this.extraLyricService.extraLyricSig();
    } else {
      this.dataSource = this.LyricService.lyricsSig();
    }
    this.id = this.route.snapshot.paramMap.get('id');
    const found = this.dataSource.find((item) => item.id === this.id);

    if (found) {
      this.item = this.extra
        ? (found as ExtraLyricInterface)
        : (found as LyricInterface);
    } else {
      // Handle the case where the item is not found, e.g., assign a default Lyric or throw an error
      if (this.extra) {
        this.extraLyricsFirebase
          .getExtraLyric(this.id!)
          .subscribe((lyric: ExtraLyricInterface) => {
            this.item = lyric;
          });
      }
      this.LyricsFirebase.getLyric(this.id!).subscribe(
        (lyric: LyricInterface) => {
          this.item = lyric;
        }
      );
    }
  }
  goBack() {
    if (this.louange) {
      this.router.navigate(['louange']);
    } else {
      this.router.navigate(['']);
    }
  }
}
