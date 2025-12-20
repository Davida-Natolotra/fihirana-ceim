import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Lyrics } from './pages/lyrics/lyrics';
import { AdminHome } from './pages/admin-home/admin-home';
import { AdminLogin } from './pages/admin-login/admin-login';
import { AdminEdit } from './pages/admin-edit/admin-edit';
import { authGuard } from './auth/auth.guard';
import { publicGuard } from './auth/public.guard';
import { LoginComponent } from './components/login/login';
import { environment } from '../environments/environment.prod';
import { HomeLouange } from './pages/home-louange/home-louange';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'louange',
    component: HomeLouange,
  },
  {
    path: 'login', // Login page - protected by publicGuard
    component: LoginComponent,
    // canActivate: [publicGuard],
  },
  { path: 'lyric/:id', component: Lyrics },
  { path: 'extralyric/:id', component: Lyrics },
  { path: 'login', component: AdminLogin },
  {
    path: environment.adminLink, // Admin link for public access
    component: AdminHome,
    // canActivate: [authGuard],
    // data: { authGuardPipe: redirectUnauthorizedTo(['/login']) },
  },
  {
    path: environment.adminLink + '/lyric/:id', // Admin link for private access - example: https://firebasestorage.googleapis.com/v0/b/0197b669-b8b0-72bb-aa6f-2011f0278cc3/lyric/:id,
    component: AdminEdit,
    // canActivate: [authGuard],
    // data: { authGuardPipe: redirectUnauthorizedTo(['/login']) },
  },
  {
    path: environment.adminLink + '/extralyric/:id', // Admin link for private access - example: https://firebasestorage.googleapis.com/v0/b/0197b669-b8b0-72bb-aa6f-2011f0278cc3/lyric/:id,
    component: AdminEdit,
    // canActivate: [authGuard],
    // data: { authGuardPipe: redirectUnauthorizedTo(['/login']) },
  },
  {
    path: '**', // Wildcard route for any undefined paths
    redirectTo: '/', // Redirect to the public home page
    pathMatch: 'full',
  },
];
