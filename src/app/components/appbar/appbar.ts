import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; // For routerLink and navigation

// Angular Material Imports

import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider'; // For mat-divider in menu

// Services
import { AuthService } from '../../services/auth.service';
import { Notification } from '../../services/notification.service';

// RxJS
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@angular/fire/auth';
@Component({
  selector: 'app-appbar',
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    CommonModule,
    RouterLink,
    MatMenuModule,
    MatDividerModule,
  ],
  templateUrl: './appbar.html',
  styleUrl: './appbar.css',
})
export class Appbar {
  router = inject(Router);
  user$: Observable<User | null> | undefined;
  userInitial$: Observable<string> | undefined;
  goBack() {
    this.router.navigate(['']);
  }

  constructor(
    private authService: AuthService,
    private notificationService: Notification
  ) {
    // These observables are derived from AuthService and will be used in the template
    this.user$ = this.authService.getCurrentUser();
    this.userInitial$ = this.user$.pipe(
      map((user) => {
        if (user) {
          const name = user.displayName || user.email;
          return name ? name.charAt(0).toUpperCase() : '';
        }
        return '';
      })
    );
  }

  ngOnInit(): void {
    // No specific initialization needed for this simple component
  }

  async onLogout(): Promise<void> {
    this.notificationService
      .openConfirmDialog({
        title: 'Confirm Logout',
        message: 'Are you sure you want to log out?',
        confirmButtonText: 'Yes, Logout',
        cancelButtonText: 'No, Stay',
      })
      .subscribe(async (confirmed) => {
        if (confirmed) {
          try {
            await this.authService.logout().toPromise();
            this.notificationService.showSuccess('You have been logged out.');
            this.router.navigateByUrl('/login'); // Redirect to login page after logout
          } catch (error) {
            console.error('Logout error:', error);
            this.notificationService.showError(
              'Failed to log out. Please try again.'
            );
          }
        }
      });
  }
}
