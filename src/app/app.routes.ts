import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Lyrics } from './pages/lyrics/lyrics';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  { path: 'lyric/:id', component: Lyrics },
];
