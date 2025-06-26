import { Component } from '@angular/core';
import { Lists } from '../../components/lists/lists';

@Component({
  selector: 'app-home',
  imports: [Lists],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
