import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {LouangeService} from '../../../services/louange/louange.service';
import {NewList} from '../../../features/Lyrics/components/new-list/new-list';
import {TitleState} from '../../../features/appbar/state/title.state';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, NewList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  constructor(private louangeService: LouangeService, private appTitle: TitleState, private router: Router) {
    this.louangeService.setLouangeSig(false);
  }

  ngOnInit() {
    this.appTitle.setAppTitle("Fihirana CEIM")
  }


}
