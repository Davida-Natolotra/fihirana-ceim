import { Component } from '@angular/core';
import { Lists } from '../../components/lists/lists';
import { ExtraLists } from '../../components/extra-lists/extra-lists';
import { LouangeService } from '../../services/louange.service';
@Component({
  selector: 'app-home-louange',
  imports: [Lists, ExtraLists],
  templateUrl: './home-louange.html',
  styleUrl: './home-louange.css',
})
export class HomeLouange {
  constructor(private louangeService: LouangeService) {
    this.louangeService.setLouangeSig(true);
  }
}
