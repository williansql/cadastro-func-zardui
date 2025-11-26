import { Routes } from '@angular/router';
import { mainRoute } from './features/main-page/home.route';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    children: mainRoute
  }

];
