// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

// Angular Material Imports (keep these as the component uses them directly)
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Make sure this is imported if using mat-icon suffixes

// Import the new NotificationService
import { Notification } from '../../services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: Notification // Inject the new service
  ) {}

  async onLogin(): Promise<void> {
    try {
      await this.authService.login(this.email, this.password).toPromise();
      this.notificationService.showSuccess('Connexion réussie !'); // French message
      this.router.navigateByUrl('/admin'); // Assuming /admin is the post-login redirect
    } catch (error: any) {
      console.error('Login error:', error);
      let message = 'Une erreur inattendue est survenue. Veuillez réessayer.'; // Default French error
      switch (error.code) {
        case 'auth/invalid-email':
          message = "Format d'adresse e-mail invalide.";
          break;
        case 'auth/user-disabled':
          message = 'Ce compte utilisateur a été désactivé.';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          message = 'E-mail ou mot de passe invalide.';
          break;
      }
      this.notificationService.showError(message); // French message
    }
  }

  async onForgotPassword(): Promise<void> {
    if (!this.email) {
      this.notificationService.showError(
        'Veuillez saisir votre e-mail pour réinitialiser le mot de passe.'
      ); // French message
      return;
    }

    try {
      await this.authService.sendPasswordReset(this.email).toPromise();
      this.notificationService.showSuccess(
        'E-mail de réinitialisation du mot de passe envoyé ! Vérifiez votre boîte de réception.'
      ); // French message
    } catch (error: any) {
      console.error('Password reset error:', error);
      let message =
        "Échec de l'envoi de l'e-mail de réinitialisation du mot de passe. Veuillez réessayer."; // Default French error
      switch (error.code) {
        case 'auth/invalid-email':
          message = "Format d'adresse e-mail invalide.";
          break;
        case 'auth/user-not-found':
          message = 'Aucun utilisateur trouvé avec cette adresse e-mail.';
          break;
      }
      this.notificationService.showError(message); // French message
    }
  }
}
