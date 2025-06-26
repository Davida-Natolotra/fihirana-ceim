import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-appbar',
  imports: [MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './appbar.html',
  styleUrl: './appbar.css',
})
export class Appbar {
  router = inject(Router);
  goBack() {
    this.router.navigate(['']);
  }
}
