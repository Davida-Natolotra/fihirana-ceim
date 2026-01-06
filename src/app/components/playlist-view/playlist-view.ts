import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlaylistsService } from '../../services/playlists/playlists.service';
import { PlaylistInterface } from '../../models/playlist.interface';
import { PlaylistsfbService } from '../../services/playlists/playlistsfb.service';
import { Lyricsfb } from '../../services/lyrics/lyricsfb.service';
import { switchMap, forkJoin, map, of } from 'rxjs';

@Component({
  selector: 'app-playlist-view',
  imports: [],
  templateUrl: './playlist-view.html',
  styleUrl: './playlist-view.css',
})
export class PlaylistView implements OnInit {
  private route = inject(ActivatedRoute);
  playlistsService = inject(PlaylistsService);
  private playlistsfbService = inject(PlaylistsfbService);
  private lyricsfbService = inject(Lyricsfb);
  playlist_id = this.route.snapshot.paramMap.get('id');

  // Signal to track loading and playlist state
  isLoading: WritableSignal<boolean> = signal(true);
  currentPlaylist: WritableSignal<PlaylistInterface | null> = signal(null);
  error: WritableSignal<string | null> = signal(null);

  ngOnInit() {
    this.isLoading.set(true);
    this.error.set(null);

    this.playlistsfbService
      .getPlaylist(this.playlist_id!)
      .pipe(
        switchMap((playlist: PlaylistInterface) => {
          // Convert songs to array if it's an object
          let songs: any[] = [];
          if (Array.isArray(playlist.songs)) {
            songs = playlist.songs;
          } else if (playlist.songs && typeof playlist.songs === 'object') {
            // If it's an object, convert object values to array
            songs = [Object.values(playlist.songs)];
          }

          const lyricsObservables = songs.map((song: any) =>
            this.lyricsfbService.getLyric(song.id || song)
          );

          if (lyricsObservables.length === 0) {
            return of({ ...playlist, songs: [] });
          }

          return forkJoin(lyricsObservables).pipe(
            map((lyrics) => {
              const enrichedSongs = lyrics
                .filter((lyric) => lyric.id !== undefined)
                .map((lyric) => ({
                  ...lyric,
                  id: lyric.id!,
                  isExtra: false,
                }));
              return {
                ...playlist,
                songs: enrichedSongs,
              };
            })
          );
        })
      )
      .subscribe({
        next: (playlist) => {
          this.currentPlaylist.set(playlist);
          this.playlistsService.setCurrentPlaylist(playlist);
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error('Error loading playlist:', err);
          this.error.set('Failed to load playlist');
          this.isLoading.set(false);
        },
      });
  }
}
