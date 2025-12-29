import { Component } from '@angular/core';
import { Lists } from '../../components/lists/lists';
import { ExtraLists } from '../../components/extra-lists/extra-lists';
import { PlaylistList } from '../../components/playlist-list/playlist-list';
import { LouangeService } from '../../services/louange/louange.service';
import { MatTabsModule } from '@angular/material/tabs';
@Component({
  selector: 'app-home-louange',
  imports: [Lists, ExtraLists, MatTabsModule, PlaylistList],
  templateUrl: './home-louange.html',
  styleUrl: './home-louange.css',
})
export class HomeLouange {
  constructor(private louangeService: LouangeService) {
    this.louangeService.setLouangeSig(true);
  }
}
