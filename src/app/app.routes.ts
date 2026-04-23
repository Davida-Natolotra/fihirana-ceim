import {Routes} from '@angular/router';
import {Lyrics} from './pages/public/lyrics/lyrics';
import {AdminHome} from './pages/admin/admin-home/admin-home';
import {AdminLogin} from './pages/admin/admin-login/admin-login';
import {AdminEdit} from './pages/admin/admin-edit/admin-edit';
import {LoginComponent} from './components/login/login';
import {environment} from '../environments/environment.prod';
import {HomeLouange} from './pages/louange/home-louange/home-louange';
import {AdminPlaylistEdit} from './pages/admin/admin-playlist-edit/admin-playlist-edit';
import {Song} from './pages/louange/song/song';
import {PlaylistHome} from './pages/playlist-home/playlist-home';
import {Home} from './pages/public/home/home';
import {ExtraList} from './pages/extra-list/extra-list';

export const routes: Routes = [
  {
    path: '',
    component: HomeLouange,
  },
  {
    path: 'louange',
    component: HomeLouange,
  },
  {path: 'fihirana', component: Home},
  {path: 'extra-list', component: ExtraList},
  {
    path: 'login', // Login page - protected by publicGuard
    component: LoginComponent,
    // canActivate: [publicGuard],
  },
  {path: 'lyric/:id', component: Lyrics},
  {path: 'extralyric/:id', component: Lyrics},
  {path: 'login', component: AdminLogin},
  {
    path: environment.adminLink, // Admin link for public access
    component: AdminHome,
    // canActivate: [authGuard],
    // data: { authGuardPipe: redirectUnauthorizedTo(['/login']) },
  },
  {path: 'playlist-home', component: PlaylistHome},
  {
    path: 'playlist/:id',
    // component: Playlist,
    component: AdminPlaylistEdit,
  },
  {
    path: 'playlist-edit/:id',
    component: AdminPlaylistEdit,
  },
  {
    path: 'song/:id',
    component: Song,
  },
  {
    path: 'song/extralyric/:id',
    component: Song,
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
