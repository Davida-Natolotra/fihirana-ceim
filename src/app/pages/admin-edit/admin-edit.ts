import { Component, inject } from '@angular/core';
import { LyricEdit } from '../../components/lyric-edit/lyric-edit';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-edit',
  imports: [LyricEdit, MatButtonModule],
  templateUrl: './admin-edit.html',
  styleUrl: './admin-edit.css',
})
export class AdminEdit {
  router = inject(Router);
  goBack() {
    this.router.navigate(['/admin']);
  }
}
