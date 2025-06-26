import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Appbar } from './components/appbar/appbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Appbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'fihirana-ceim';
}
