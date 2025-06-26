import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
@Component({
  selector: 'app-appbar',
  imports: [MatToolbarModule],
  templateUrl: './appbar.html',
  styleUrl: './appbar.css',
})
export class Appbar {}
