// src/app/guards/public.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, user } from '@angular/fire/auth';
import { map, take } from 'rxjs/operators'; // Add take for completing the observable

export const publicGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return user(auth).pipe(
    take(1), // Take only the first emission and then complete
    map((firebaseUser) => {
      if (firebaseUser) {
        // User is logged in, redirect to admin page
        router.navigate(['/admin']);
        return false; // Prevent activation of the current route (login page)
      } else {
        // User is not logged in, allow access to public route (login page)
        return true;
      }
    })
  );
};
