import {Component, inject, OnInit} from '@angular/core';
import {PlaylistList} from '../../features/Playlist/components/playlist-list/playlist-list';
import {TitleState} from '../../features/appbar/state/title.state';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-playlist-home',
  imports: [
    PlaylistList,
    MatIconModule, MatButtonModule
  ],
  templateUrl: './playlist-home.html',
  styleUrl: './playlist-home.css'
})
export class PlaylistHome implements OnInit {

  appTitle = inject(TitleState)
  router = inject(Router)

  ngOnInit() {
    this.appTitle.setAppTitle("Playlist")
  }

  goHome() {
    this.router.navigate(['/'])
  }

}
