// src/app/services/auth.service.ts
import { Injectable, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  User,
  onAuthStateChanged,
  sendPasswordResetEmail, // Import this
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private auth: Auth = inject(Auth);
  public user$: Observable<User | null>;

  constructor() {
    this.user$ = new Observable((observer) => {
      onAuthStateChanged(
        this.auth,
        (user) => {
          observer.next(user);
        },
        (error) => observer.error(error),
        () => observer.complete()
      );
    });
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.auth, email, password).then(
      () => {}
    );
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.auth);
    return from(promise);
  }

  // New: Send Password Reset Email
  sendPasswordReset(email: string): Observable<void> {
    const promise = sendPasswordResetEmail(this.auth, email).then(() => {});
    return from(promise);
  }

  getCurrentUser(): Observable<User | null> {
    return this.user$;
  }
}
