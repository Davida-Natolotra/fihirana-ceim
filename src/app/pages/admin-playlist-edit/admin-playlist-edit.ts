import { Component } from '@angular/core';
import { PlaylistEditSonglist } from '../../components/playlist-edit-songlist/playlist-edit-songlist';

@Component({
  selector: 'app-admin-playlist-edit',
  imports: [PlaylistEditSonglist],
  templateUrl: './admin-playlist-edit.html',
  styleUrl: './admin-playlist-edit.css',
})
export class AdminPlaylistEdit {}
