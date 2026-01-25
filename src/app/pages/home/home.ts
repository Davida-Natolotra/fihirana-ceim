import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LouangeService } from '../../services/louange/louange.service';
import { NewList } from '../../components/new-list/new-list';

@Component({
  selector: 'app-home',
  imports: [MatButtonModule, NewList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private louangeService: LouangeService) {
    this.louangeService.setLouangeSig(false);
  }
}
