import { Component, inject } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog-delete',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog-delete.html',
  styleUrl: './confirm-dialog-delete.css',
})
export class ConfirmDialogDelete {
  dialogRef = inject(MatDialogRef<ConfirmDialogDelete>);
}
