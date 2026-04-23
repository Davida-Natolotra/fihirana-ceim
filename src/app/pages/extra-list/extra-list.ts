import {Component, inject, OnInit} from '@angular/core';
import {ExtraLists} from '../../features/Lyrics/components/extra-lists/extra-lists';
import {TitleState} from '../../features/appbar/state/title.state';
import {MatIconModule} from '@angular/material/icon';
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-extra-list',
  imports: [
    ExtraLists, MatIconModule, MatButtonModule
  ],
  templateUrl: './extra-list.html',
  styleUrl: './extra-list.css'
})
export class ExtraList implements OnInit {
  appTitle = inject(TitleState)
  router = inject(Router)

  ngOnInit() {
    this.appTitle.setAppTitle("Hira hafa")
  }

  gotoHome() {
    this.router.navigate(["/"])
  }
}
