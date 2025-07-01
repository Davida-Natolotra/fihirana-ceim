import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-install-prompt-dialog',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './install-prompt-dialog.html',
  styleUrl: './install-prompt-dialog.css',
})
export class InstallPromptDialog {
  constructor(
    private dialogRef: MatDialogRef<InstallPromptDialog>,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  install() {
    this.dialogRef.close('install');
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
