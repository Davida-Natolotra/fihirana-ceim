import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Appbar } from './components/appbar/appbar';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { InstallPromptDialog } from './components/install-prompt-dialog/install-prompt-dialog';
import { UpdateAvailableDialog } from './components/update-available-dialog/update-available-dialog';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Appbar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'Fihirana CEIM';
  private swUpdate = inject(SwUpdate);
  private dialog = inject(MatDialog);
  deferredPrompt: any;
  constructor() {
    this.handleAppUpdate();
  }

  ngOnInit() {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault();
      this.deferredPrompt = e;

      const dialogRef = this.dialog.open(InstallPromptDialog, {
        width: '400px',
        data: {
          title: "Installer l'application",
          message:
            'Voulez-vous installer l’application Fihirana CEIM sur votre appareil ?',
          confirmButtonText: 'Installer',
          cancelButtonText: 'Annuler',
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === 'install') {
          this.promptInstall();
        }
      });
    });

    window.addEventListener('appinstalled', () => {
      console.log("L'application a été installée.");
      this.deferredPrompt = null;
    });
  }

  private handleAppUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.versionUpdates
        .pipe(
          filter(
            (evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'
          )
        )
        .subscribe(() => {
          const dialogRef = this.dialog.open(UpdateAvailableDialog);
          dialogRef.afterClosed().subscribe((result) => {
            if (result === 'update') {
              this.swUpdate.activateUpdate().then(() => location.reload());
            }
          });
        });
    }
  }

  private async promptInstall() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      const choice = await this.deferredPrompt.userChoice;
      console.log('User choice:', choice.outcome);
      this.deferredPrompt = null;
    }
  }
}
