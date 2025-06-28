import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Lyrics } from './pages/lyrics/lyrics';
import { AdminHome } from './pages/admin-home/admin-home';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AdminLogin } from './pages/home/admin-login/admin-login';
import { AdminEdit } from './pages/admin-edit/admin-edit';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  { path: 'lyric/:id', component: Lyrics },
  { path: 'login', component: AdminLogin },
  {
    path: 'admin',
    component: AdminHome,
    // canActivate: [canActivate],
    // data: { authGuardPipe: redirectUnauthorizedTo(['/login']) },
  },
  {
    path: 'admin/lyric/:id',
    component: AdminEdit,
    // canActivate: [canActivate],
    // data: { authGuardPipe: redirectUnauthorizedTo(['/login']) },
  },
];
