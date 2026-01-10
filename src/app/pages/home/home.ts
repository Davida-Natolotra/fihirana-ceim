import {Component} from '@angular/core';
import {Lists} from '../../components/lists/lists';
import {MatButtonModule} from '@angular/material/button';
import {LouangeService} from '../../services/louange/louange.service';

@Component({
  selector: 'app-home',
  imports: [Lists, MatButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private louangeService: LouangeService) {
    this.louangeService.setLouangeSig(false);
  }

}
