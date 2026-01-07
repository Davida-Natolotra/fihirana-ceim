import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-update-available-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './update-available-dialog.html',
  styleUrl: './update-available-dialog.css',
})
export class UpdateAvailableDialog {
  constructor(private dialogRef: MatDialogRef<UpdateAvailableDialog>) {}

  reload() {
    this.dialogRef.close('update');
  }

  close() {
    this.dialogRef.close('later');
  }
}
