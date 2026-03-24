import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {
  PlaylistEditSonglist
} from '../../../features/Playlist/components/playlist-edit-songlist/playlist-edit-songlist';
import {PlaylistsfbService} from '../../../features/Playlist/api/playlistfb/playlistsfb.service';
import {PlaylistsService} from '../../../features/Playlist/state/playlists/playlists.service';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators,} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-playlist-edit',
  imports: [
    PlaylistEditSonglist,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule,
    MatIconModule,
  ],

  templateUrl: './playlist-edit.html',
  styleUrl: './playlist-edit.css',
})
export class PlaylistEdit implements OnInit {
  isEditable = false;
  private _formBuilder = inject(FormBuilder);
  secondFormGroup = this._formBuilder.group({
    songs: ['', Validators.required],
  });
  private router = inject(Router);
  private playlistsService = inject(PlaylistsService);
  private playlistsfbService = inject(PlaylistsfbService);
  private route = inject(ActivatedRoute);
  playlistId = this.route.snapshot.paramMap.get('id');
  private currentPlaylist = this.playlistsService.getPlaylist(this.playlistId!);
  playlistNameValue = this.currentPlaylist()!.name;
  firstFormGroup = this._formBuilder.group({
    playlistName: [this.playlistNameValue || '', Validators.required],
  });

  ngOnInit() {
    this.playlistsfbService
      .getPlaylist(this.playlistId!)
      .subscribe((playlist) => {
        this.firstFormGroup.patchValue({playlistName: playlist.name});
      });
  }

  enableEdit() {
    this.isEditable = true;
  }

  disableEdit() {
    this.isEditable = false;
  }

  savePlaylistName() {
    const updatedName = this.firstFormGroup.get('playlistName')!.value;
    if (updatedName) {
      this.playlistsfbService
        .updatePlaylist(this.playlistId!, {name: updatedName} as any)
        .subscribe(() => {
          this.playlistsService.setPlaylists(
            this.playlistsService
              .playlistsSig()
              .map((playlist) =>
                playlist.id === this.playlistId
                  ? {...playlist, name: updatedName}
                  : playlist,
              ),
          );
          this.isEditable = false;
        });
    }
  }

  backToLouange() {
    this.router.navigate(['/louange']);
  }
}
