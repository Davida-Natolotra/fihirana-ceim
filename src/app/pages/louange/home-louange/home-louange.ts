import {Component, inject} from '@angular/core';
import {LouangeService} from '../../../services/louange/louange.service';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {TitleState} from '../../../features/appbar/state/title.state';
import {Router} from '@angular/router';
import {Footer} from '../../../features/footer/footer';

@Component({
  selector: 'app-home-louange',
  imports: [MatTabsModule, MatButton, MatIcon, Footer],
  templateUrl: './home-louange.html',
  styleUrl: './home-louange.css',
})
export class HomeLouange {
  appTitle = inject(TitleState)

  constructor(private louangeService: LouangeService, private router: Router) {
    this.louangeService.setLouangeSig(true);
  }

  ngOnInit() {
    this.appTitle.resetAppTitle()
  }

  gotoPlaylist() {
    this.router.navigate(["playlist-home"])
  }

  gotoFihiranaList() {
    this.router.navigate(['fihirana'])
  }

  gotoExtraList() {
    this.router.navigate(['extra-list'])
  }
}
