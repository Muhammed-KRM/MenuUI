import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/client-menu/client-menu.component').then(m => m.ClientMenuComponent),
    title: 'Laden | Menü'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
