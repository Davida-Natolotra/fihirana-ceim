import { Component, inject, OnInit, Signal, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PlaylistEditSonglist } from '../../components/playlist-edit-songlist/playlist-edit-songlist';
import { PlaylistsfbService } from '../../services/playlists/playlistsfb.service';
import { PlaylistsService } from '../../services/playlists/playlists.service';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  private _formBuilder = inject(FormBuilder);
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
  secondFormGroup = this._formBuilder.group({
    songs: ['', Validators.required],
  });
  isEditable = false;

  ngOnInit() {
    this.playlistsfbService
      .getPlaylist(this.playlistId!)
      .subscribe((playlist) => {
        this.firstFormGroup.patchValue({ playlistName: playlist.name });
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
        .updatePlaylist(this.playlistId!, { name: updatedName } as any)
        .subscribe(() => {
          this.playlistsService.setPlaylists(
            this.playlistsService
              .playlistsSig()
              .map((playlist) =>
                playlist.id === this.playlistId
                  ? { ...playlist, name: updatedName }
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
