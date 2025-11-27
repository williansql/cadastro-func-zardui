import { Routes } from '@angular/router';
import { mainRoute } from './features/main-page/home.route';
import { MainPage } from './features/main-page/main-page';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'home',
    component: MainPage,
    children: mainRoute
  }
];
