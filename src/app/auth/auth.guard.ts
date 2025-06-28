import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth'; // user observable from AngularFire
import { map, take } from 'rxjs/operators'; // Add take for completing the observable

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth); // Inject the Firebase Auth service
  const router = inject(Router); // Inject the Angular Router

  // user(auth) emits the current user or null when the auth state changes.
  // take(1) ensures we only take the first emission and complete the observable,
  // which is crucial for guards to resolve immediately.
  return user(auth).pipe(
    take(1),
    map((firebaseUser) => {
      if (firebaseUser) {
        // If a user object exists, they are logged in.
        return true; // Allow access to the route
      } else {
        // If no user object (null), they are not logged in.
        // Redirect to the login page.
        router.navigate(['/login']);
        return false; // Prevent access to the route
      }
    })
  );
};
